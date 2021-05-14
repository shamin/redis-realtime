# redis-realtime-client

Redis realtime react client

## Installation

```sh
npm install @shamin/redis-realtime-client
```

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
        <App />
      </RealtimeProvider>
    </Container>
  )
}
```

| Props   | Description                                                        | Default |
| ------- | ------------------------------------------------------------------ | ------- |
| `baseUrl` | Base url of the domain where backend is hosted (without protocols) | nil     |
| `db`      | Database name that is to be connected                              | nil     |
| `secure`  | Whether the web socket connection is secure                        | true    |

### Hooks

#### useRealtime

```jsx
import React from 'react'
import { useRealtime } from '@shamin/redis-realtime-client'

function App() {
  const { publisher, subscribe } = useRealtime()
  const { setDb } = publisher('list')
  const listValue = subscribe('list')

  const onChange = (e) => {
    setDb(e.target.value)
  }

  return (
    <input value={listValue} placeholder="Type something here" onChange={onChange} />
  )
}
```

| Parameters    | Description                      |
| ------------- | -------------------------------- |
| `publisher`   | Create a publish for a key in db |
| `subscribe`   | Create a subscriber for a key in db |

##### Publisher Functions

| Parameters    | Description                      |
| ------------- | -------------------------------- |
| `setDb`   | Similar to set json in redis it sets the value of publisher key |


