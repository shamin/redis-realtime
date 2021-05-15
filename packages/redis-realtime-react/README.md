# redis-realtime-react

Redis realtime react client

## Installation

```sh
npm install @space-kit/redis-realtime-react
```

## Usage

### Provider

Add the `RealtimeProvider` to the top level with db name and base url.

```jsx
import React from 'react'
import { RealtimeProvider } from '@space-kit/redis-realtime-react'
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

| Props     | Description                                                        | Default |
| --------- | ------------------------------------------------------------------ | ------- |
| `baseUrl` | Base url of the domain where backend is hosted (without protocols) | nil     |
| `db`      | Database name that is to be connected                              | nil     |
| `secure`  | Whether the web socket connection is secure                        | true    |

### Hooks

#### useRealtime

```jsx
import React from 'react'
import { useRealtime } from '@space-kit/redis-realtime-react'

function App() {
  const { publisher, subscribe } = useRealtime()
  const { setDb } = publisher('text')
  const textValue = subscribe('text')

  const onChange = (e) => {
    setDb(e.target.value)
  }

  return (
    <input value={textValue} placeholder="Type something here" onChange={onChange} />
  )
}
```

| Parameters  | Description                         |
| ----------- | ----------------------------------- |
| `publisher` | Create a publish for a key in db    |
| `subscribe` | Create a subscriber for a key in db |

##### `Publisher` Parameters

| Parameters | Description                                                     |
| ---------- | --------------------------------------------------------------- |
| `setDb`    | Similar to set json in redis it sets the value of publisher key |

##### `Subscriber` Parameters

| Parameters  | Description                       |
| ----------- | --------------------------------- |
| `data`      | Value of the key in redis db      |
| `isLoading` | Whether the value is being loaded |
