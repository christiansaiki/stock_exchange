import { RequestHandler } from '../controllers';

/**
 * Router - this class a method that routes all the requests
 *
 * @export
 * @class Router
 */
export default class Router {
	constructor(fastify, mongo) {
		this.fastify = fastify;
		this.mongo = mongo;
	}

	init() {
		const { fastify, mongo } = this;
		const handler = new RequestHandler(mongo);

		fastify.get('/exchange',  handler.get);
		fastify.get('/alternative_exchange', handler.get);
		fastify.get('/health', handler.get);
	}
}
