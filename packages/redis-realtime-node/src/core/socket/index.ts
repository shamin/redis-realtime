import url from 'url'
import WebSocket from 'ws'
import { v4 as uuidv4 } from 'uuid'
import { ConnectionDetails } from './types'

const socketServer = new WebSocket.Server({
  noServer: true,
})

export const connectClient = ([request, socket, head]: any, db: string) => {
  const baseURL = 'http://' + request.headers.host + '/'
  const { pathname } = new URL(request.url, baseURL)
  if (pathname !== `/${db}`) {
    socket.destroy()
  }

  const connectionId = uuidv4()
  socketServer.handleUpgrade(request, socket, head, function (ws) {
    socketServer.emit('connection', ws, { id: connectionId, pathname })
  })

  return socketServer;
}
