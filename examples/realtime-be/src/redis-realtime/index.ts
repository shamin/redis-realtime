import http from 'http'
import { connectClient } from './client'

const redisRealtime = (server: http.Server, db: { name: string }) => {
  server.on('upgrade', async function (...args) {
    await connectClient(args, db)
  })
}

export default redisRealtime
