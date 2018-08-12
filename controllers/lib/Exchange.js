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
		this.sortByHighestBid = this.sortByHighestBid.bind(this);
		this.budgetCheck = this.budgetCheck.bind(this);
		this.baseBidCheck = this.baseBidCheck.bind(this);
	}

	/**
   * buyStock - This is the main method of this class.
   * It is responsible for checking if the stock is within the targeting params.
   * Then it checks if it is within the budget constraints.
   * Then it checks if it is inside the baseBid restrictions.
   * Then it chooses the highest baseBid and responds to the client.
   *
   * @param {object} query - fastify req.query object
   * @returns {string} response string
   * @memberof Exchange
   */
	async buyStock (query) {
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
		if (promise.error) return 'Error in Server during query';

		// Base Targeting Check
		if (!promise.result.length) return 'No Companies Passed from Targeting';
		this.buildLog('Base Targeting:', promise.result);

		// Budget Check
		const budgetCompanies = this.budgetCheck(promise.result, adjustedBid);
		if (!budgetCompanies.length) return 'No Companies Passed from Budget';
		this.buildLog('Budget Check:', budgetCompanies);

		// BaseBid Check
		const validBidCompanies = this.baseBidCheck(budgetCompanies, adjustedBid);
		if (!validBidCompanies.length) return 'No Companies Passed from BaseBid check';
		this.buildLog('Base Bid Check:', validBidCompanies);

		// Choose winner by sorting from the highest basebid to the lowest
		const sortedCompanies = this.sortByHighestBid(validBidCompanies);
		const winner = sortedCompanies[0];

		helper.logger.info('Winner:', winner.company_id);

		const promise2 = await this.stocks.findAndUpdate({company_id: winner.company_id}, {$inc: {budget: adjustedBid * -1}});
		if (promise2.error) return 'Error in Server while updating';
		return winner.company_id;
	}

	/**
   * buildLog - It is just a method to make it easier to log which
   * companies passed or failed in the restrictions.
   *
   * @param {string} step
   * @param {array} array
   * @memberof Exchange
   */
	buildLog(step, array) {
		const companies = ['C1', 'C2', 'C3'];
		let log = '';
		const presentCompanies = array.map(company => company.company_id);

		companies.forEach(company => {
			let status = presentCompanies.includes(company) ? 'Passed' : 'Failed';
			log = `${log} {${company}: ${status}} `;
		});
		helper.logger.info(step, log);
	}


	/**
	 * budgetCheck - checks if the company has still stocks to be sold.
	 *
	 * @param {array} array
	 * @param {number} adjustedBid
	 * @returns {array}
	 * @memberof Exchange
	 */
	budgetCheck(array, adjustedBid) {
		return array.filter(company => (company.budget - adjustedBid) >= 0);
	}


	/**
	 * baseBidCheck - checks if the client has a higher bid than the
	 * baseBid required by the company
	 *
	 * @param {array} array
	 * @param {number} adjustedBid
	 * @returns {array}
	 * @memberof Exchange
	 */
	baseBidCheck(array, adjustedBid) {
		return array.filter(company => adjustedBid >= company.base_bid);
	}

	/**
	 * sortByHighestBid - sorts the stocks by the descending
	 * order of base_bid
	 *
	 * @param {array} array
	 * @returns {array}
	 * @memberof Exchange
	 */
	sortByHighestBid(array) {
		return [...array].sort((a, b) => {
			if (a.base_bid > b.base_bid) return -1;
			if (a.base_bid < b.base_bid) return 1;
			return 0;
		});
	}
}
