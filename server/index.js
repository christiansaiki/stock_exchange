const fastify = require('fastify')();
import Router from './Router';
import { MongoDB } from '../db';
import helper from '../helper'

// Environment Variables
const env = process.env.NODE_ENV || 'local';
const port = process.env.PORT || 3000;
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

// listen on the specified port
fastify.listen(port, err => {
	if (err) console.log(err);
	else helper.logger.info(`Server online - Listening to port ${port}`);
});
