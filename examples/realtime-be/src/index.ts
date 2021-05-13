import dotenv from 'dotenv'
import createApp from './core/app'
import http from 'http'
import redisRealtime from '@shamin/redis-realtime-node'

dotenv.config()

const startApp = async () => {
  try {
    const app = await createApp()

    const port = process.env.PORT || 5000
    app.set('port', port)

    const server = http.createServer(app)

    redisRealtime(server, 'text')

    server.listen(app.get('port'), () => {
      console.log(`Server Running at http://localhost:${port}`)
    })
  } catch (error) {
    console.error(`Error occured ${error}`)
  }
}

startApp()
