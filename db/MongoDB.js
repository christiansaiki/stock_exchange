import mongoose from 'mongoose';
import { stocks } from './schemas/stocks_schema';
import helper from '../helper';

/**
 * MongoDB - it is responsible to handle MongoDB connection by using
 * the library called mongoose
 *
 * @export
 * @class MongoDB
 */
export default class MongoDB {
	constructor (env, mongoUrl) {
		this.env = env;
		this.mongoUrl = mongoUrl;
	}

	init () {
		const Schema = mongoose.Schema;
		mongoose.connect(this.mongoUrl);
		helper.logger.info(`MONGO: Connected to ${this.env} - ${this.mongoUrl}`);
		mongoose.set('debug', false);

		this.Stocks = mongoose.model('stocks', stocks(Schema));
	}

	disconnect () {
		mongoose.disconnect();
	}
}
