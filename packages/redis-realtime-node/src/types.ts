type DbDataTypes = 'HANDSHAKE_SUCCESS' | 'DB_UPSERT'

interface DbData {
  type: DbDataTypes
  id: string
  message: any
}
