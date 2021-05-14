import { Box } from '@chakra-ui/layout'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app'
import Doc from './app/doc'
import Navbar from './components/navbar'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Box bg="gray.50" minHeight="100vh">
        <Navbar />
        <div>
          <Switch>
            <Route path="/" exact component={App} />
            <Route path="/doc/:id" exact component={Doc} />
          </Switch>
        </div>
      </Box>
    </BrowserRouter>
  )
}

export default Router
