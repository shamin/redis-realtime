import { Box } from '@chakra-ui/layout'
import { Flex } from '@chakra-ui/react'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app'
import Doc from './app/doc'
import Navbar from './components/navbar'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Flex
        bg="gray.50"
        minHeight="100vh"
        flexDirection="column"
        alignItems="center"
      >
        <Navbar />
        <div>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/doc/:id" exact component={Doc} />
          </Switch>
        </div>
      </Flex>
    </BrowserRouter>
  )
}

export default Router
