const {
  VITE_AUTH0_DOMAIN,
  VITE_AUTH0_CLIENT_ID,
  VITE_AUTH0_AUDIENCE,
  VITE_SERVER_URL,
} = import.meta.env

const config = {
  domain: VITE_AUTH0_DOMAIN as string,
  clientId: VITE_AUTH0_CLIENT_ID as string,
  audience: VITE_AUTH0_AUDIENCE as string,
  serverUrl: VITE_SERVER_URL as string,
}

export default config
