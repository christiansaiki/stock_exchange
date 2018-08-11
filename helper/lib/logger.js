import pinojs from 'pino';

const pino = pinojs({
	name: 'stockExchange',
	level: process.env.LOG_LEVEL || 'info',
	prettyPrint: true
});

export default pino;
