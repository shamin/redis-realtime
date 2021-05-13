import redis from 'redis'
import { addReJSONModule } from './modules'

addReJSONModule(redis)

export { subscribe, publish } from './pubsub'
export { setJson, getJson } from './json'
