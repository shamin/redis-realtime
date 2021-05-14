import React from 'react'
import { useRealtime } from '@shamin/redis-realtime-client'
import { Textarea, Container } from '@chakra-ui/react'

function App() {
  const { publisher, subscribe } = useRealtime()
  const { setDb } = publisher('list')
  const listValue = subscribe('list')

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setDb(e.target.value)
  }

  return (
    <Container>
      <Textarea
        value={listValue}
        placeholder="Type something here"
        onChange={onChange}
      />
    </Container>
  )
}

export default App
