import { getJson, publish, setJson, subscribe } from './core/redis'
import logger from './logger'

export const subscribeToDb = (
  id: string,
  db: string,
  callback: (message: string) => void
) => {
  subscribe(`db/${db}`, id, (message: string) => {
    const data = JSON.parse(message)
    if (data.id !== id) {
      callback(message)
    }
  })
}

export const publishToDb = async (db: string, message: DbData) => {
  publish(`db/${db}`, JSON.stringify(message))
  await writeToDb(db, message.key, message.data)
}

export const writeToDb = (db: string, key: string, value: any) => {
  return setJson(db, `.${key}`, JSON.stringify(value))
}

export const readDb = (db: string, key: string) => {
  return getJson(db, `.${key}`)
}

export const createDbIfNotExists = async (db: string) => {
  if (!(await readDb(db, ''))) {
    await setJson(db, '.', `{}`)
    logger.debug(`Database ${db} was created as it didn't exist`)
  }
}
