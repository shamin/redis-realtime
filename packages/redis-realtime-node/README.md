# redis-realtime-node

Redis realtime nodejs sdk

## Installation
```sh
npm install @space-kit/redis-realtime-node
```

## Usage
```js
// app can be an instance of your express application    
const server = http.createServer(app)
redisRealtime(server, 'dbName')
```