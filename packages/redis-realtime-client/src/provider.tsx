import React, { useContext, useState } from 'react'
import { useSocket } from './socket'

interface RealtimeContextType {
  db: string
  updateDb: (data: any) => void
}

const RealtimeContext = React.createContext<RealtimeContextType>(
  {} as RealtimeContextType
)
export const useRealtime = () => useContext(RealtimeContext)

interface RealtimeProviderProps {
  children: React.ReactNode
  db: string
  baseUrl: string
  token?: string
  secure?: boolean
}

export const RealtimeProvider = ({
  children,
  baseUrl,
  db,
  token,
  secure = true
}: RealtimeProviderProps) => {
  const [dbState, setDbState] = useState({})

  const onNewData = (data: any) => {
    setDbState(data)
  }

  const { sendMessage } = useSocket(`${secure ? 'wss' : 'ws'}://${baseUrl}/${db}`, onNewData, token)

  const updateDb = (data: any) => {
    sendMessage({
      type: 'DB_UPSERT',
      data,
    })
  }

  const contextValue = React.useMemo(
    () => ({
      db,
      updateDb,
    }),
    [sendMessage]
  )

  return (
    <RealtimeContext.Provider value={contextValue}>
      {children}
    </RealtimeContext.Provider>
  )
}
