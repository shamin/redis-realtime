# redis-realtime-client

Redis realtime react client

## Usage

### Provider

Add the `RealtimeProvider` to the top level with db name and base url.
```jsx
import React from 'react'
import { RealtimeProvider } from '@shamin/redis-realtime-client'
import App from './app'

function Root() {
  return (
    <Container>
      <RealtimeProvider baseUrl="localhost:5000" db="todos" secure={false}>
        <Router />
      </RealtimeProvider>
    </Container>
  )
}
```

| Props  | Description | Default |
| ------------- | ------------- | --------- |
| baseUrl | Base url of the domain where backend hosted without protocols  |  nil |
| db  | Database name that is to be connected  | nil |
| secure  | Whether the web socket connection is secure  | true |