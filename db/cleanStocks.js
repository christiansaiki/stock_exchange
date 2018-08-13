import BaseRepository from './BaseRepository';
import MongoDB from './MongoDB';

const env = process.env.NODE_ENV || 'local';
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/stock_exchange';

module.exports = cleanStocks;

function cleanStocks (mongo, shouldDisconnect) {
	if (!mongo) {
		mongo = new MongoDB(env, mongoUrl);
		mongo.init();
	}

	const Stocks = new BaseRepository(mongo.Stocks);
	Stocks.remove({})
		.then(() => {
			console.log('finished');
			if (shouldDisconnect) mongo.disconnect();
		})
		.catch((err) => {
			console.log(err);
			if (shouldDisconnect) mongo.disconnect();
		});
}

