import React from 'react'
import {
  HStack,
  Icon,
  VStack,
  Text,
  Center,
  Spinner,
  Link,
  Spacer,
  Box,
  Button,
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
  const { subscribe, publisher } = useRealtime()
  const { data = [], isLoading } = subscribe<Document[]>(`documents`)
  const { arrayPopDb } = publisher<Document[]>('documents')

  const deleteDoc = (id: string, index: number) => {
    console.log('DElete', id, index)
    arrayPopDb(id, index)
    const { delDb } = publisher<Document[]>(`doc${id}`)
    delDb()
  }

  if (isLoading) {
    return (
      <Center>
        <Spinner />
      </Center>
    )
  }
  return (
    <Box p="4" maxW={800} w="100%">
      {data.length <= 0 ? (
        <Center mt={16}>
          <VStack spacing={4}>
            <Text>No documents found! Create a new one.</Text>
            <NewDoc />
          </VStack>
        </Center>
      ) : (
        <VStack>
          {data.map((d, i) => (
            <Box key={d.id} boxShadow="xs" p="6" rounded="md" bg="white" w="100%">
              <HStack>
                <Link as={RouterLink} to={`/doc/${d.id}`} w="100%">
                  <HStack>
                    <Icon as={FcDocument} w={10} h={10} />
                    <Text>{d.name}</Text>
                    <Spacer />
                    <Text color="gray.400">{getRelativeTime(d.date)}</Text>
                  </HStack>
                </Link>
                <Spacer />
                <Button
                  onClick={() => {
                    deleteDoc(d.id, i)
                  }}
                >
                  Delete
                </Button>
                <Icon as={RiArrowRightSLine} w={5} h={5} />
              </HStack>
            </Box>
          ))}
        </VStack>
      )}
    </Box>
  )
}

export default App
