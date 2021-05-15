import * as redis from 'redis'
import { promisify } from 'util'
import { REDIS_SERVER_URL } from './config'

const redisClient = redis.createClient(REDIS_SERVER_URL)

// @ts-ignore
export const setJson = promisify(redisClient.json_set).bind(redisClient)
// @ts-ignore
export const getJson = promisify(redisClient.json_get).bind(redisClient)
// @ts-ignore
export const delJson = promisify(redisClient.json_del).bind(redisClient)
// @ts-ignore
export const insertArrayJSON = promisify(redisClient.json_arrinsert).bind(
  redisClient
)
// @ts-ignore
export const popArrayJSON = promisify(redisClient.json_arrpop).bind(redisClient)

export const safePopArrayJSON = async (
  db: string,
  key: string,
  id: string,
  index: number
) => {
  const value = await getJson(db, `.${key}[${index}]`)
  if (value && JSON.parse(value).id === id) {
    await popArrayJSON(db, `.${key}`, index)
  }
}
