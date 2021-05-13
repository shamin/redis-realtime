import redis from 'redis'
import { REDIS_SERVER_URL } from './config'

const redisClient = redis.createClient(REDIS_SERVER_URL)

// @ts-ignore
export const setJson = promisify(redisClient.json_set).bind(redisClient)
// @ts-ignore
export const getJson = promisify(redisClient.json_get).bind(redisClient)
