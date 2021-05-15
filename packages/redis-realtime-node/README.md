# redis-realtime-node

Redis realtime nodejs sdk

![npm](https://img.shields.io/npm/v/@space-kit/redis-realtime-node)

## Installation

```sh
npm i @space-kit/redis-realtime-node
```

## Usage

```js
const http = require('http')
const { default: redisRealtime } = require('@space-kit/redis-realtime-node')

// app can be an instance of your express application
const server = http.createServer(app)
redisRealtime(server, 'redis://localhost:6379', 'dbName')
```
