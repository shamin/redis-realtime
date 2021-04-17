import React from 'react'
import { useSocket } from './redisRealtime/socket'

function App() {
  const onNewData = (...args: any) => {
    console.log(args)
  }
  const { updateDb } = useSocket('ws://localhost:5000', onNewData)
  return <div className="App">Hello</div>
}

export default App
