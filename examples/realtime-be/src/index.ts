import dotenv from 'dotenv'
import createApp from './core/app'
import http from 'http'

dotenv.config()

const startApp = async () => {
  try {
    const app = await createApp()

    const port = process.env.PORT || 5000
    app.set('port', port)

    const server = http.createServer(app)

    server.listen(app.get('port'), () => {
      console.log(`Server Running at http://localhost:${port}`)
    })
  } catch (error) {
    console.error(`Error occured ${error}`)
  }
}

startApp()
