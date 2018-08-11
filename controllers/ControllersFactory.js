import { BaseRepository } from "../db";
import {
	Exchange,
	Health
} from ".";

export default class ControllersFactory {
	constructor(mongo) {
		const Stocks = new BaseRepository(mongo.Stocks);
		this.health = new Health;
		this.exchange = new Exchange(Stocks);
	}

	getControllers(url) {
		// Health controller routes
		if(/^(\/health)$/.test(url)) return this.health.check;

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
		return res.send(404);
	}
}
