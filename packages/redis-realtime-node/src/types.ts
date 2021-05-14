type DbDataTypes = 'HANDSHAKE_SUCCESS' | 'DB_SET'  | 'DB_INITIALISE'

interface DbData {
  type: DbDataTypes
  id: string
  key: string
  data: any
}
