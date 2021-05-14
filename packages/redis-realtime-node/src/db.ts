import { getJson, publish, setJson, subscribe } from './core/redis'

export const subscribeToDb = (
  id: string,
  db: string,
  callback: (message: string) => void
) => {
  subscribe(`db/${db}`, id, (message: string) => {
    callback(message)
  })
}

export const publishToDb = (db: string, message: DbData) => {
  publish(`db/${db}`, JSON.stringify(message))
}

export const writeToDb = (db: string, key: string, value: any) => {
  return setJson(db, `.${key}`, JSON.stringify(value))
}

export const readDb = (db: string, key: string) => {
  return getJson(db, `.${key}`)
}
