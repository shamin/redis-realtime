import redis from 'redis'
import { promisify } from 'util'
import { isEmpty, omit } from 'lodash'
const REDIS_SERVER = 'redis://localhost:6379'

type CallbackFunction = (message: string) => void

const connections: {
  [dbName: string]: {
    [id: string]: CallbackFunction
  }
} = {}

const subscriber = redis.createClient(REDIS_SERVER)
const publisher = redis.createClient(REDIS_SERVER)

export const subscribe = (
  subscriptionName: string,
  subscriptionId: string,
  callback: (message: string) => void
) => {
  connections[subscriptionName] = {
    ...connections[subscriptionName],
    [subscriptionId]: callback,
  }
  if (Object.keys(connections[subscriptionName]).length === 1) {
    subscriber.subscribe(subscriptionName)
  }
}

subscriber.on('message', function (channel, message) {
  const callbacks = connections[channel]
  Object.values(callbacks).forEach((c) => c(message))
})

export const unsubscribe = (subscriptionName: string, subscriptionId: string) => {
  connections[subscriptionName] = omit(connections[subscriptionName], subscriptionId)
  if (isEmpty(connections)) {
    subscriber.unsubscribe(subscriptionName)
  }
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
