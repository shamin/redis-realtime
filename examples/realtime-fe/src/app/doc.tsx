import { Badge, Box, Center, Heading, HStack, Spacer } from '@chakra-ui/react'
import { Spinner } from '@chakra-ui/spinner'
import { useRealtime, CONNECTION_STATUS } from '@space-kit/redis-realtime-react'
import { RawDraftContentState } from 'draft-js'
import React from 'react'
import { useParams } from 'react-router'
import DocEditor from '../components/editor'
import { Document } from './types'

interface DocProps {}

const Doc: React.FC<DocProps> = () => {
  const { id } = useParams<{ id: string }>()
  const { publisher, subscribe, connectionStatus } = useRealtime()
  const { setDb } = publisher<RawDraftContentState>(`doc${id}`)
  const { data, isLoading } = subscribe<RawDraftContentState>(`doc${id}`)

  const { data: documents = [] } = subscribe<Document[]>(`documents`)

  const doc = documents.find((d) => d.id === id)

  return (
    <Box p="4" maxW={800} w="100%">
      <HStack pb="4">
        {doc && <Heading size="md">{doc.name}</Heading>}
        <Spacer />
        {connectionStatus === CONNECTION_STATUS.open && (
          <Badge colorScheme="green">Connected</Badge>
        )}
        {connectionStatus === CONNECTION_STATUS.closed && (
          <Badge colorScheme="red">Disconnected</Badge>
        )}
        {connectionStatus === CONNECTION_STATUS.connecting && (
          <Badge colorScheme="purple">Connecting</Badge>
        )}
      </HStack>
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
