import redis from 'redis'
import { promisify } from 'util'
const REDIS_SERVER = 'redis://localhost:6379'

const connections = new Map<string, (message: string) => void>()

const subscriber = redis.createClient(REDIS_SERVER)
const publisher = redis.createClient(REDIS_SERVER)

export const subscribe = (
  subscriptionName: string,
  callback: (message: string) => void
) => {
  connections.set(subscriptionName, callback)
  subscriber.subscribe(subscriptionName)
}

subscriber.on('message', function (channel, message) {
  const callback = connections.get(channel)
  callback(message)
})

export const unsubscribe = (subscriptionName: string) => {
  connections.delete(subscriptionName)
  subscriber.unsubscribe(subscriptionName)
}

export const publish = (subscriptionName: string, message: string) => {
  publisher.publish(subscriptionName, message)
}

const redisClient = redis.createClient(REDIS_SERVER)

redisClient.on('connect', () => {
  console.log('connected to redis')
})

redisClient.on('error', function (err) {
  console.error('Error ' + err)
})

export const getAsync = promisify(redisClient.get).bind(redisClient)
export const lrangeAsync = promisify(redisClient.lrange).bind(redisClient)
export const rpushAsync = promisify(redisClient.rpush).bind(redisClient)
export const lremAsync = promisify(redisClient.lrem).bind(redisClient)

export default redisClient
