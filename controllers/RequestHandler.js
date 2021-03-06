import ControllersFactory from './ControllersFactory';

export default class RequestHandler {
	constructor(mongo) {
		this.controllersFactory = new ControllersFactory(mongo);

		this.get = this.get.bind(this);
	}

	/**
	 * get - this method handles all the GET requests
	 *
	 * @param {object} req - fastify request object
	 * @param {object} res - fastify response object
	 * @memberof RequestHandler
	 */
	async get(req, res) {
		const { raw, query } = req;
		const result = await this.controllersFactory.getControllers(raw.url)(query);
		res.send(result);
	}
}
