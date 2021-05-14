import { Container } from '@chakra-ui/layout'
import { css } from '@emotion/react'
import { useRealtime } from '@shamin/redis-realtime-client'
import React from 'react'
import DocEditor from '../components/editor'

interface DocProps {}

const Doc: React.FC<DocProps> = () => {
  const { publisher, subscribe } = useRealtime()
  const { setDb } = publisher('list')
  const content = subscribe('list')

  return (
    <Container
      css={css`
        .editor-wrapper {
          background-color: white;
          min-height: 500px;
        }
      `}
    >
      <DocEditor content={content} onChange={setDb} />
    </Container>
  )
}

export default Doc
