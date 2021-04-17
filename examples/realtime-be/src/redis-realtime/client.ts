import url from 'url'
import WebSocket from 'ws'

const testSocket = new WebSocket.Server({
  noServer: true,
})

export const connectClient = async (
  [request, socket, head]: any,
  db: { name: string }
) => {
  const pathName = url.parse(request.url).pathname

  // pathname will be the redis db name

  const someId = '123'
  testSocket.handleUpgrade(request, socket, head, function (ws) {
    testSocket.emit('connection', ws, someId)
  })

  // if (pathName === db.name) {
  //   // const dbSubscription = await subscribeDb(db.name)
  //   const someId = '123'
  //   testSocket.handleUpgrade(request, socket, head, function (ws) {
  //     console.log('Emit connection')
  //     testSocket.emit('connection', ws, someId)
  //   })
  // } else {
  //   socket.destroy()
  // }
}

testSocket.on('connection', function (ws, someId: string) {
  // subscribeToDb(someId, newMessageCallback)

  ws.on('message', async function (message: any) {
    try {
      // const data: any = JSON.parse(message)
      console.log(message)
    } catch (err) {
      console.log(`Error processing webhook message from ${someId}`, err)
    }
  })
})
