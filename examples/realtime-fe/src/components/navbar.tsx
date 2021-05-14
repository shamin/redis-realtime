import { Box, Heading, HStack, Link, Spacer } from '@chakra-ui/react'
import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import NewDoc from './newDoc'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <Box pt={4} pb={4} w={1200}>
      <HStack>
        <Link as={RouterLink} to="/">
          <Heading size="lg">Docs</Heading>
        </Link>
        <Spacer />
        <NewDoc />
      </HStack>
    </Box>
  )
}

export default Navbar
