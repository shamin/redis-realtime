import { createLogger, format, transports } from 'winston'

const logger = createLogger({
  level: process.env.NODE_ENV === 'production' ? 'info' : 'debug',
  format: format.combine(
    format.colorize(),
    format.label({ label: 'REDIS REALTIME' }),
    format.timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    format.json(),
    format.printf((info) => {
      // @ts-ignore
      const args = info[Symbol.for('splat')]
      const strArgs = args?.map((a: unknown) => JSON.stringify(a)).join(' ')
      return `[${info.timestamp}] [${info.level}]: ${info.message} ${
        strArgs || ''
      } | ${info.label}`
    })
  ),
  transports: [new transports.Console()],
})

export default logger
