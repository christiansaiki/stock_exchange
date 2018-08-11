import BaseRepository from './BaseRepository';
import MongoDB from './MongoDB';

const env = process.env.NODE_ENV || 'local';
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/stock_exchange';

// Init Mongo
const mongo = new MongoDB(env, mongoUrl);
mongo.init();

const Stocks = new BaseRepository(mongo.Stocks);

Stocks.remove({})
	.then(() => {
		console.log('finished');
		process.exit();
	})
	.catch((err) => {
		console.log(err);
		process.exit();
	});
