import { Box, Center } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
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
    <Box p="4" maxW={800} w="100%">
      {isLoading ? (
        <Center>
          <Spinner />
        </Center>
      ) : (
        <DocEditor content={data} onChange={setDb} />
      )}
    </Box>
  )
}

export default Doc
