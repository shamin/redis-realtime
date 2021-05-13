import { publish, subscribe } from './redis'

export const subscribeToDb = (
  id: string,
  pathName: string,
  callback: (message: string) => void
) => {
  subscribe(`db${pathName}`, id, (message: string) => {
    callback(message)
  })
}

export const publishToDb = (pathName: string, message: string) => {
  publish(`db${pathName}`, JSON.stringify(message))
}
