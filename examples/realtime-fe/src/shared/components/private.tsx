import React from 'react'
import { Route } from 'react-router-dom'
import { withAuthenticationRequired } from '@auth0/auth0-react'
import { Spinner } from '@chakra-ui/spinner'

const PrivateRoute = ({ component, ...args }) => (
  <Route
    component={withAuthenticationRequired(component, {
      // eslint-disable-next-line react/display-name
      onRedirecting: () => <Spinner />,
    })}
    {...args}
  />
)

export default PrivateRoute
