import express from 'express'
import router from './routes'

const createApp = async () => {
  const app = express()

  app.use(express.urlencoded({ extended: true }))
  app.use(express.json())

  app.use(express.static('frontend/dist'))

  app.use('/', router)

  return app
}

export default createApp
