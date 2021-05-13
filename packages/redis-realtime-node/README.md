# redis-realtime-node

Redis realtime nodejs sdk

## Installation
```
npm install @shamin/redis-realtime-node
```

## Usage
```
// app can be an instance of your express application    
const server = http.createServer(app)
redisRealtime(server, 'dbName')
```