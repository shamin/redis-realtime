import React from 'react'
import { useSocket } from '../redisRealtime/socket'
import { Textarea, Container } from '@chakra-ui/react'

function App() {
  const onNewData = (...args: any) => {
    console.log(args)
  }
  const { updateDb } = useSocket('ws://localhost:5000/text', onNewData)
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    updateDb(e.target.value)
  }
  return (
    <Container>
      <Textarea placeholder="Type something here" onChange={onChange} />
    </Container>
  )
}

export default App
