import React, { useContext, useEffect, useReducer, useState } from 'react'
import { dbReducer } from './db'
import { useSocket } from './socket'

type Publish = (key: string) => { setDb: (data: any) => void }

interface RealtimeContextType {
  db: string
  publisher: Publish
  state: any
  subscribe: (key: string) => any
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
  secure = true,
}: RealtimeProviderProps) => {
  const [dbState, dispatch] = useReducer(dbReducer, { connectionId: undefined })

  const onNewData = (data: any) => {
    dispatch(data)
  }

  const { sendMessage } = useSocket(
    `${secure ? 'wss' : 'ws'}://${baseUrl}/${db}`,
    onNewData,
    token
  )

  useEffect(() => {
    if (dbState.connectionId) {
      sendMessage({
        type: 'DB_INITIALISE',
        key: 'list',
      })
    }
  }, [dbState.connectionId])

  const publisher: Publish = (key: string) => ({
    setDb: (data: any) => {
      sendMessage({
        type: 'DB_SET',
        key,
        data,
      })
    },
  })

  const subscribe = (key: string) => dbState[key]

  const contextValue = React.useMemo(
    () => ({
      db,
      publisher,
      state: dbState,
      subscribe,
    }),
    [sendMessage]
  )

  return (
    <RealtimeContext.Provider value={contextValue}>
      {children}
    </RealtimeContext.Provider>
  )
}
