import { Container } from '@chakra-ui/layout'
import { Center } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { css } from '@emotion/react'
import { useRealtime } from '@shamin/redis-realtime-client'
import { RawDraftContentState } from 'draft-js'
import React from 'react'
import { useParams } from 'react-router'
import DocEditor from '../components/editor'

interface DocProps {}

const Doc: React.FC<DocProps> = () => {
  const { id } = useParams<{ id: string }>()
  const { publisher, subscribe } = useRealtime()
  const { setDb } = publisher<RawDraftContentState>(`doc${id}`)
  const { data, isLoading } = subscribe<RawDraftContentState>(`doc${id}`)

  return (
    <Container
      css={css`
        .editor-wrapper {
          background-color: white;
          min-height: 500px;
        }
      `}
    >
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <DocEditor content={data} onChange={setDb} />
      )}
    </Container>
  )
}

export default Doc
