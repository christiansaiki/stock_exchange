import BaseRepository from './BaseRepository';
import MongoDB from './MongoDB';

const stocks = [{
	company_id: 'C1',
	countries: ['US', 'FR'],
	budget: 1,
	base_bid: 0.1,
	categories: ['Automobile', 'Finance']
}, {
	company_id: 'C2',
	countries: ['IN', 'US'],
	budget: 2,
	base_bid: 0.3,
	categories: ['Finance', 'IT']
}, {
	company_id: 'C3',
	countries: ['US', 'RU'],
	budget: 3,
	base_bid: 0.05,
	categories: ['IT', 'Automobile']
}];

Promise.each = async (arr, fn) => {
	for(const item of arr) await fn(item);
};

module.exports = populateDb;

function populateDb (mongo, shouldDisconnect) {
	const env = process.env.NODE_ENV || 'local';
	const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/stock_exchange';


	// Init Mongo
	if(!mongo) {
		mongo = new MongoDB(env, mongoUrl);
		mongo.init();
	}
	const Stocks = new BaseRepository(mongo.Stocks);

	Promise.each(stocks, async stock => {
		await Stocks.findAndUpdate({company_id: stock.company_id}, stock, {upsert: true});
	}).then(() => {
		console.log('finished');
		if (shouldDisconnect) {
			console.log('Disconnecting');
			mongo.disconnect();
		}
	})
		.catch((err) => {
			console.log(err);
			if (shouldDisconnect) mongo.disconnect();
		});
};

