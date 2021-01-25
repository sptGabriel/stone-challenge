import pino, { Logger } from "pino";
const isoTime = () => `,"time":"${new Date(Date.now()).toISOString()}"`
export const logger =  pino({
	enabled: true,
	level: 'debug',
	prettyPrint:{ colorize: true, levelFirst: true},
	
	timestamp:isoTime,
	prettifier: require('pino-pretty')
})