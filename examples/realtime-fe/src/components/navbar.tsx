import { Box, Heading, HStack, Link, Spacer, Flex } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import NewDoc from './newDoc'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
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
          <NewDoc />
        </HStack>
      </Box>
    </Flex>
  )
}

export default Navbar
