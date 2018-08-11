import { BaseRepository } from "../db";
import {
	Exchange,
} from ".";

export default class ControllersFactory {
	constructor(mongo) {
		const Stocks = new BaseRepository(mongo.Stocks);
		this.exchange = new Exchange(Stocks);
	}

	getControllers(url) {
		// Exchange controller routes
		if(/^(\/exchange\?.+)$/.test(url)) return this.exchange.buyStock;
		return this.notFound;
	}

	/**
	 * notFound - Only returns 404
	 *
	 * @returns {number}
	 * @memberof ControllersFactory
	 */
	notFound(res) {
		return res.sendStatus(404);
	}
}
