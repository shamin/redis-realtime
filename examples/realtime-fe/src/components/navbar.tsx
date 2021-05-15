import { Box, Heading, HStack, Link, Spacer, Flex, Badge } from '@chakra-ui/react'
import { CONNECTION_STATUS, useRealtime } from '@space-kit/redis-realtime-react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import NewDoc from './newDoc'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = () => {
  const { connectionStatus } = useRealtime()
  return (
    <Flex
      w="100%"
      bg="white"
      justifyContent="center"
      mb={4}
      boxShadow="xs"
      rounded="md"
    >
      <Box p="4" maxW={800} w="100%">
        <HStack>
          <Link as={RouterLink} to="/">
            <Heading size="lg">Docs</Heading>
          </Link>
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
          <Spacer />
          <NewDoc />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Navbar
