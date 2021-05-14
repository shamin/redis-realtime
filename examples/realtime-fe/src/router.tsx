import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app'

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <div>
        Navbar
        <div>
          <Switch>
            <Route path="/" exact component={App} />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default Router
