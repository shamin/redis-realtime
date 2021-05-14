import { useRealtime } from '@shamin/redis-realtime-client'
import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from './app'

const Router: React.FC = () => {
  const { db } = useRealtime()
  console.log(db)
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
