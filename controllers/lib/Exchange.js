import helper from '../../helper';

/**
 * Exchange controller
 * @class Exchange
 */
export default class Exchange {
	/**
	 *Creates an instance of Exchange.
	 * @param {object} stocks - mongoDB model
	 * @memberof Exchange
	 */
	constructor (stocks) {
		this.stocks = stocks;

		// Main methods
		this.buyStock = this.buyStock.bind(this);

		// Auxiliary Methods
		this.buildLog = this.buildLog.bind(this);
	}

	async buyStock (res, query) {
		const country = query.countrycode;
		const category = query.Category;
		const baseBid = query.BaseBid;
		const adjustedBid = baseBid/100;

		helper.logger.info('Request Received:', {
			country,
			category,
			baseBid
		});

		const mongoQuery = {
			countries: country,
			categories: category
		};
		const promise = await this.stocks.findAll(mongoQuery);
		if (promise.err) throw promise.err;

		// Base Targeting Check
		if (!promise.result.length) return res.send('No Companies Passed from Targeting');
		this.buildLog('Base Targeting:', promise.result);

		// Budget Check
		const budgetCompanies = promise.result.filter(company => {
			return (company.budget - adjustedBid) >= 0;
		});
		if (!budgetCompanies.length) return res.send('No Companies Passed from Budget');
		this.buildLog('Budget Check:', budgetCompanies);

		// Base Bid Check
		const validBidCompanies = budgetCompanies.filter(company => adjustedBid >= company.base_bid);
		if (!validBidCompanies.length) return res.send('No Companies Passed from BaseBid check');
		this.buildLog('Base Bid Check:', validBidCompanies);

		// Choose winner by sorting from the highest basebid to the lowest
		validBidCompanies.sort((a, b) => {
			if (a.base_bid > b.base_bid) return -1;
			if (a.base_bid < b.base_bid) return 1;
			return 0;
		});

		const winner = validBidCompanies[0];

		helper.logger.info('Winner:', winner.company_id);

		const promise2 = await this.stocks.findAndUpdate({company_id: winner.company_id}, {$inc: {budget: adjustedBid * -1}});
		if (promise2.err) throw promise2.err;
		return res.send(winner.company_id);
	}

	buildLog(step, array) {
		let log = '';
		const presentCompanies = array.map(company => company.company_id);
		const companies = ['C1', 'C2', 'C3'];

		companies.forEach(company => {
			let status = presentCompanies.includes(company) ? 'Passed' : 'Failed';
			log = `${log} {${company}: ${status}} `;
		});
		helper.logger.info(step, log);
	}
}