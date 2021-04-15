import React from 'react'
import { useHistory } from 'react-router-dom'
import { AppState, Auth0Provider } from '@auth0/auth0-react'
import config from '../shared/config'

interface AuthProviderProps {
  children: React.ReactNode
}

const AuthProvider: React.FC<AuthProviderProps> = ({
  children,
}: AuthProviderProps) => {
  const history = useHistory()

  const onRedirectCallback = (appState: AppState) => {
    history.push(appState?.returnTo || window.location.pathname)
  }

  return (
    <Auth0Provider
      domain={config.domain}
      clientId={config.clientId}
      redirectUri={window.location.origin}
      onRedirectCallback={onRedirectCallback}
      audience={config.audience}
    >
      {children}
    </Auth0Provider>
  )
}

export default AuthProvider
