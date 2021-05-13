import url from 'url'
import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { publishToDb, subscribeToDb } from './db'
import logger from '../core/logger'

const socketServer = new WebSocket.Server({
  noServer: true,
})

type DbDataTypes = 'HANDSHAKE_SUCCESS' | 'DB_UPSERT'

interface DbData {
  type: DbDataTypes
  id: string
  message: any
}

interface ConnectionDetails {
  pathName: string
  id: string
}

export const connectClient = async (
  [request, socket, head]: any,
  db: { name: string }
) => {
  logger.debug(`New connection intiating`)
  const pathName = url.parse(request.url).pathname

  // pathname will be the redis db name
  if (pathName !== '/text') {
    socket.destroy()
  }

  const randomUniqueId = uuidv4()
  socketServer.handleUpgrade(request, socket, head, function (ws) {
    socketServer.emit('connection', ws, { id: randomUniqueId, pathName })
  })

  // if (pathName === db.name) {
  //   // const dbSubscription = await subscribeDb(db.name)
  //   const someId = '123'
  //   socketServer.handleUpgrade(request, socket, head, function (ws) {
  //     console.log('Emit connection')
  //     socketServer.emit('connection', ws, someId)
  //   })
  // } else {
  //   socket.destroy()
  // }
}

socketServer.on('connection', function (ws, { id, pathName }: ConnectionDetails) {
  const sendJSON = (message: any) => {
    ws.send(JSON.stringify(message))
  }

  logger.debug(`New client connected to db:${pathName} id: ${id}`)
  sendJSON({ type: 'HANDSHAKE_SUCCESS', id, pathName })
  subscribeToDb(id, pathName, function (message) {
    console.log('New message', message)
    ws.send(message)
  })

  ws.on('message', async function (message: any) {
    try {
      const data: DbData = JSON.parse(message)
      if (data.type === 'DB_UPSERT') {
        publishToDb(pathName, data.message)
      }
    } catch (err) {
      console.log(`Error processing webhook message from ${id}`, err)
    }
  })
})
