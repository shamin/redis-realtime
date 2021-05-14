import { useReducer } from 'react'

export function dbReducer(state: STATE, action: ACTION_TYPES) {
  switch (action.type) {
    case 'HANDSHAKE_SUCCESS':
      return { connectionId: action.id }
    case 'DB_SET':
      return { ...state, [action.key]: action.data }
    case 'DB_INITIALISE':
      return { ...state, [action.key]: action.data }
    default:
      throw new Error('Action not defined')
  }
}

type STATE = {
  [key: string]: any
  connectionId?: string
}

export type ACTION_TYPES =
  | {
      type: 'HANDSHAKE_SUCCESS'
      id: string
    }
  | {
      type: 'DB_SET'
      key: string
      data: any
    }
  | {
      type: 'DB_INITIALISE'
      key: string
      data: any
    }
