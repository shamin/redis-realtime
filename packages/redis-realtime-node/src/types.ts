type DbDataTypes = 'HANDSHAKE_SUCCESS' | 'DB_SET'

interface DbData {
  type: DbDataTypes
  id: string
  data: any
}
