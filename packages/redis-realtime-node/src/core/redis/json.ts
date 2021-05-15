import * as redis from 'redis'
import { promisify } from 'util'

let redisClient: redis.RedisClient

let setJson: any, getJson: any, delJson: any, insertArrayJSON: any, popArrayJSON: any

export const initialiseRedisJsonClient = (url: string) => {
  redisClient = redis.createClient(url)

  // @ts-ignore
  setJson = promisify(redisClient.json_set).bind(redisClient)
  // @ts-ignore
  getJson = promisify(redisClient.json_get).bind(redisClient)
  // @ts-ignore
  delJson = promisify(redisClient.json_del).bind(redisClient)
  // @ts-ignore
  insertArrayJSON = promisify(redisClient.json_arrinsert).bind(redisClient)
  // @ts-ignore
  popArrayJSON = promisify(redisClient.json_arrpop).bind(redisClient)
}

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

export { setJson, getJson, delJson, insertArrayJSON, popArrayJSON }
