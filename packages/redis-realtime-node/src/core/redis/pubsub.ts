import * as redis from 'redis'
import { CallbackFunction } from './types'
import { isEmpty, omit } from 'lodash'
import { RedisClient } from 'redis'

let subscriber: RedisClient, publisher: RedisClient

const connections: {
  [dbName: string]: {
    [id: string]: CallbackFunction
  }
} = {}

export const initialiseRedisPubsubClients = (url: string) => {
  subscriber = redis.createClient(url)
  publisher = redis.createClient(url)

  subscriber.on('message', function (channel, message) {
    const callbacks = connections[channel]
    Object.values(callbacks).forEach((c) => c(message))
  })
}

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

export const unsubscribe = (subscriptionName: string, subscriptionId: string) => {
  connections[subscriptionName] = omit(connections[subscriptionName], subscriptionId)
  if (isEmpty(connections)) {
    subscriber.unsubscribe(subscriptionName)
  }
}

export const publish = (subscriptionName: string, message: string) => {
  publisher.publish(subscriptionName, message)
}
