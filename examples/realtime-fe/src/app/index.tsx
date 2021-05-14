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
} from '@chakra-ui/react'
import { FcDocument } from 'react-icons/fc'
import { RiArrowRightSLine } from 'react-icons/ri'
import { useRealtime } from '@shamin/redis-realtime-client'
import NewDoc from '../components/newDoc'
import { Link as RouterLink } from 'react-router-dom'

interface Document {
  id: string
  name: string
}

function App() {
  const { subscribe } = useRealtime()
  const { data = [], isLoading } = subscribe<Document[]>(`documents`)
  if (isLoading) {
    return (
      <Container>
        <Center>
          <Spinner />
        </Center>
      </Container>
    )
  }
  return (
    <Container>
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
                <Icon as={RiArrowRightSLine} w={5} h={5} />
              </HStack>
            </Link>
          ))}
        </VStack>
      )}
    </Container>
  )
}

export default App
