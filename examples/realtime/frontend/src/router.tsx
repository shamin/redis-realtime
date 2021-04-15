import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import { Spinner } from '@chakra-ui/spinner'
import PrivateRoute from './shared/components/private'

const Router: React.FC = () => {
  const { isLoading } = useAuth0()

  if (isLoading) {
    return <Spinner />
  }

  return (
    <div>
      Navbar
      <div>
        <Switch>
          {/* <Route path="/" exact component={Home} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} /> */}
        </Switch>
      </div>
    </div>
  )
}

export default Router
