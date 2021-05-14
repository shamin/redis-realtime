import {
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
} from '@chakra-ui/react'
import { useRealtime } from '@shamin/redis-realtime-client'
import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid'

interface NewDocProps {}

const NewDoc: React.FC<NewDocProps> = (props: NewDocProps) => {
  const [name, setName] = useState('')
  const { publisher } = useRealtime()
  const { arrayInsertDb } = publisher(`documents`)

  const { isOpen, onOpen, onClose } = useDisclosure()

  const createDoc = () => {
    arrayInsertDb({ id: uuidv4(), name, date: new Date() })
    onClose()
  }

  return (
    <>
      <Button colorScheme="blue" onClick={onOpen}>
        New
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create new doc</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Doc name</FormLabel>
              <Input
                placeholder="Enter the name"
                onChange={(e) => setName(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={createDoc}>
              Create
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}

export default NewDoc
