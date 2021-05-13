import redis from 'redis'
import { CallbackFunction } from './types'
import { isEmpty, omit } from 'lodash'
import { REDIS_SERVER_URL } from './config'

const connections: {
  [dbName: string]: {
    [id: string]: CallbackFunction
  }
} = {}

const subscriber = redis.createClient(REDIS_SERVER_URL)
const publisher = redis.createClient(REDIS_SERVER_URL)

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
