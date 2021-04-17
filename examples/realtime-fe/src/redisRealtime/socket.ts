import { useEffect, useRef, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'

type ConnectionStatus = 'open' | 'closed' | 'connecting'
export const CONNECTION_STATUS: { [key: string]: ConnectionStatus } = {
  open: 'open',
  closed: 'closed',
  connecting: 'connecting',
}

export const useSocket = (
  socketUrl: string,
  onNewData: (database: string, data: any) => void,
  token?: string
) => {
  const ws = useRef<ReconnectingWebSocket>()

  const [status, setStatus] = useState<ConnectionStatus>(CONNECTION_STATUS.closed)

  const onMessage = (dataString: string) => {
    const { data, database } = JSON.parse(dataString)
    onNewData(database, data)
  }

  useEffect(() => {
    ws.current = new ReconnectingWebSocket(socketUrl, token ? [token] : [])

    ws.current.addEventListener('open', () => {
      setStatus(CONNECTION_STATUS.open)
    })

    ws.current.addEventListener('close', () => {
      setStatus(CONNECTION_STATUS.closed)
    })

    ws.current.addEventListener('message', (e) => {
      onMessage(e.data)
    })
  }, [])

  useEffect(() => {
    if (ws.current?.readyState === ws.current?.CLOSED) {
      setStatus(CONNECTION_STATUS.closed)
    }
    if (ws.current?.readyState === ws.current?.CONNECTING) {
      setStatus(CONNECTION_STATUS.connecting)
    }
  }, [ws?.current?.readyState])

  const updateDb = (message: string) => {
    ws?.current?.send(message)
  }

  return {
    status,
    ws,
    updateDb,
  }
}
