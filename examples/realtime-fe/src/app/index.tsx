import React from 'react'
import {
  Container,
  HStack,
  Icon,
  VStack,
  Text,
  Center,
  Spinner,
  Link,
  Spacer,
  Box,
} from '@chakra-ui/react'
import { FcDocument } from 'react-icons/fc'
import { RiArrowRightSLine } from 'react-icons/ri'
import { useRealtime } from '@shamin/redis-realtime-client'
import NewDoc from '../components/newDoc'
import { Link as RouterLink } from 'react-router-dom'
import { getRelativeTime } from '../utils/dates'

interface Document {
  id: string
  name: string
  date: string
}

function App() {
  const { subscribe } = useRealtime()
  const { data = [], isLoading } = subscribe<Document[]>(`documents`)
  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }
  return (
    <Box w={800}>
      {data.length <= 0 ? (
        <Center mt={16}>
          <VStack spacing={4}>
            <Text>No documents found! Create a new one.</Text>
            <NewDoc />
          </VStack>
        </Center>
      ) : (
        <VStack>
          {data.map((d) => (
            <Link
              as={RouterLink}
              key={d.id}
              boxShadow="xs"
              p="6"
              rounded="md"
              bg="white"
              w="100%"
              to={`/doc/${d.id}`}
            >
              <HStack>
                <Icon as={FcDocument} w={10} h={10} />
                <Text>{d.name}</Text>
                <Spacer />
                <Text>{getRelativeTime(d.date)}</Text>
                <Icon as={RiArrowRightSLine} w={5} h={5} />
              </HStack>
            </Link>
          ))}
        </VStack>
      )}
    </Box>
  )
}

export default App
