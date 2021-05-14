import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

export const getRelativeTime = (date: string) => {
  const d = dayjs(date)
  return d.fromNow()
}
