import { getJson, publish, setJson, subscribe } from './core/redis'
import { delJson, insertArrayJSON, safePopArrayJSON } from './core/redis/json'
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
  await writeToDb(db, message.type, message.key, message.data)
}

export const writeToDb = async (
  db: string,
  type: DbData['type'],
  key: string,
  value: any
) => {
  console.log('Write', db, type, key, value)
  switch (type) {
    case 'DB_ARRAY_INSERT':
      if (value.id) {
        await createDbPathIfNotExists(db, key, '[]')
        return insertArrayJSON(db, `.${key}`, 0, JSON.stringify(value))
      }
      return
    case 'DB_ARRAY_POP':
      if (value.id !== null && value.index !== null) {
        return safePopArrayJSON(db, key, value.id, value.index)
      }
      return
    case 'DB_SET':
      return setJson(db, `.${key}`, JSON.stringify(value))
    case 'DB_DELETE':
      return delJson(db, `.${key}`)
  }
}

export const readDb = (db: string, key: string) => {
  return getJson(db, `.${key}`)
}

export const createDbPathIfNotExists = async (
  db: string,
  path: string = '',
  defaultValue = '{}'
) => {
  let isExist = false
  try {
    if (await readDb(db, `${path}`)) {
      isExist = true
    }
  } catch (err) {}

  if (!isExist) {
    await setJson(db, `.${path}`, defaultValue)
  }
}

export const readDbKeys = (db: string, keys: string[]) => {
  return keys.reduce<any>(async (acc, key) => {
    const data = await readDb(db, key)
    return {
      ...acc,
      [key]: JSON.parse(data),
    }
  }, {})
}
