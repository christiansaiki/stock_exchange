import ControllersFactory from './ControllersFactory';

export default class RequestHandler {
	constructor(mongo) {
		this.controllersFactory = new ControllersFactory(mongo);

		this.get = this.get.bind(this);
	}

	/**
	 * get - this method handles all the GET requests
	 *
	 * @param {object} req - express request object
	 * @param {object} res - express response object
	 * @memberof RequestHandler
	 */
	async get(req, res) {
		const { url, params, query } = req;
		await this.controllersFactory.getControllers(url)(res, params, query);
	}
}
