import { ChakraProvider } from '@chakra-ui/react'
import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import Router from './router'

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <Router />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
