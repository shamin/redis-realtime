import * as http from 'http'
import * as WebSocket from 'ws'
import { initialiseRedisJsonClient } from './core/redis/json'
import { initialiseRedisPubsubClients } from './core/redis/pubsub'
import { connectClient, socketServer } from './core/socket'
import { ConnectionDetails } from './core/socket/types'
import {
  createDbPathIfNotExists,
  publishToDb,
  readDbKeys,
  subscribeToDb,
} from './db'
import logger from './logger'
import { DbData } from './types'

const serverConnectionCallback = (ws: WebSocket, { id, db }: ConnectionDetails) => {
  const sendJSON = (message: any) => {
    ws.send(JSON.stringify(message))
  }

  logger.debug(`New client connected to db:${db} id: ${id}`)
  sendJSON({ type: 'HANDSHAKE_SUCCESS', id, db })

  subscribeToDb(id, db, function (message) {
    ws.send(message)
  })

  ws.on('message', async function (message: any) {
    try {
      const data: DbData = JSON.parse(message)
      if (data.type === 'DB_INITIALISE') {
        let details = {}
        try {
          details = await readDbKeys(db, data.keys)
          // eslint-disable-next-line no-empty
        } catch (err) {}
        sendJSON({
          type: 'DB_INITIALISE',
          keys: data.keys,
          datas: details,
        })
      } else if (
        ['DB_SET', 'DB_ARRAY_INSERT', 'DB_ARRAY_POP', 'DB_DEL'].includes(data.type)
      ) {
        try {
          await publishToDb(db, data)
        } catch (err) {
          console.log('Pubish:', err)
        }
      }
    } catch (err) {
      console.log(`Error processing webhook message from ${id}`, err)
    }
  })
}

socketServer.on('connection', serverConnectionCallback)

const redisRealtime = (server: http.Server, url: string, db: string) => {
  initialiseRedisPubsubClients(url)
  initialiseRedisJsonClient(url)

  createDbPathIfNotExists(db).then(() => {})
  server.on('upgrade', async function (...args) {
    logger.debug(`New connection intiating`)
    connectClient(args, db)
  })
}

export default redisRealtime
