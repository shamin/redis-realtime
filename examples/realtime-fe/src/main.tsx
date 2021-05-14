import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import { RealtimeProvider } from '@shamin/redis-realtime-client'
import './index.css'
import Router from './router'

ReactDOM.render(
  <React.StrictMode>
    <RealtimeProvider baseUrl="localhost:5000" db="todos" secure={false}>
      <ChakraProvider>
        <Router />
      </ChakraProvider>
    </RealtimeProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
