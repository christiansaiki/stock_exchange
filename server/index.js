const fastify = require('fastify')();
import Router from './Router';
import { MongoDB } from '../db';

// Environment Variables
const env = process.env.NODE_ENV || 'local';
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/stock_exchange';

// Init Mongo
const mongo = new MongoDB(env, mongoUrl);
mongo.init();

// Init Router
const router = new Router(fastify, mongo);
router.init();

// handle rejections
process.on('unhandledRejection', (reason, p) => {
	console.log(reason);
	console.log(p);
});

export default {
	mongo,
	app: fastify
};