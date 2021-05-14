import React from 'react'
import { Container, Box, HStack, Icon, VStack, Text } from '@chakra-ui/react'
import { FcDocument } from 'react-icons/fc'

function App() {
  return (
    <Container>
      <VStack>
        <Box boxShadow="xs" p="6" rounded="md" bg="white" w="100%">
          <HStack>
            <Icon as={FcDocument} w={10} h={10} />
            <Text>My document name</Text>
          </HStack>
        </Box>
        <Box boxShadow="xs" p="6" rounded="md" bg="white" w="100%">
          <HStack>
            <Icon as={FcDocument} w={10} h={10} />
            <Text>My document name</Text>
          </HStack>
        </Box>
      </VStack>
    </Container>
  )
}

export default App
