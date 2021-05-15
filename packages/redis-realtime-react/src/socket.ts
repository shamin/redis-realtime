import { useEffect, useRef, useState } from 'react'
import ReconnectingWebSocket from 'reconnecting-websocket'
import { ConnectionStatus } from './types'

export const CONNECTION_STATUS: Record<ConnectionStatus, ConnectionStatus> = {
  open: 'open',
  closed: 'closed',
  connecting: 'connecting',
}

export const useSocket = (
  socketUrl: string,
  onNewData: (data: any) => void,
  token?: string
) => {
  const ws = useRef<ReconnectingWebSocket>()
  const [status, setStatus] = useState<ConnectionStatus>(CONNECTION_STATUS.closed)

  const onMessage = (dataString: string) => {
    const data = JSON.parse(dataString)
    onNewData(data)
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (ws.current?.readyState === ws.current?.CLOSED) {
      setStatus(CONNECTION_STATUS.closed)
    }
    if (ws.current?.readyState === ws.current?.CONNECTING) {
      setStatus(CONNECTION_STATUS.connecting)
    }
  }, [ws?.current?.readyState])

  const sendMessage = (data: any) => {
    ws?.current?.send(JSON.stringify(data))
  }

  return {
    status,
    sendMessage,
  }
}
