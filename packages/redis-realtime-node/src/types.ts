type DbDataTypes =
  | 'HANDSHAKE_SUCCESS'
  | 'DB_SET'
  | 'DB_INITIALISE'
  | 'DB_ARRAY_INSERT'
  | 'DB_ARRAY_POP'
  | 'DB_DEL'

export interface DbData {
  type: DbDataTypes
  id: string
  key: string
  keys: string[]
  data: any
}
