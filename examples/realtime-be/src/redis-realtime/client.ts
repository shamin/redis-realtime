import url from 'url'
import { subscribeDb } from './db'

export const connectClient = async (
  [request, socket, head]: any,
  db: { name: string }
) => {
  const pathName = url.parse(request.url).pathname

  // pathname will be the redis db name

  if (pathName === db.name) {
    const dbSubscription = await subscribeDb(db.name)

    // const adminUserId = await authenticateCompany(
    //   request.headers['sec-websocket-protocol']
    // )
    // if (adminUserId) {
    //   wssCompany.handleUpgrade(request, socket, head, function (ws) {
    //     wssCompany.emit('connection', ws, adminUserId)
    //   })
    // }
  } else {
    socket.destroy()
  }
}
