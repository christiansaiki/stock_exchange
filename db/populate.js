import BaseRepository from './BaseRepository';
import MongoDB from './MongoDB';

const env = process.env.NODE_ENV || 'local';
const mongoUrl = process.env.MONGO_URL || 'mongodb://localhost/stock_exchange';

// Init Mongo
const mongo = new MongoDB(env, mongoUrl);
mongo.init();

const Stocks = new BaseRepository(mongo.Stocks);
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

Promise.each(stocks, async stock => {
	await Stocks.create(stock);
}).then(() => {
	console.log('finished');
	process.exit();
})
	.catch((err) => {
		console.log(err);
		process.exit();
	});
