import { Container, Heading, HStack, Spacer } from '@chakra-ui/react'
import React from 'react'
import NewDoc from './newDoc'

interface NavbarProps {}

const Navbar: React.FC<NavbarProps> = (props: NavbarProps) => {
  return (
    <Container pt={4} pb={4}>
      <HStack>
        <Heading size="lg">Docs</Heading>
        <Spacer />
        <NewDoc />
      </HStack>
    </Container>
  )
}

export default Navbar
