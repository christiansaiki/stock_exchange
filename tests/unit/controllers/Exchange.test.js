import {Exchange} from '../../../controllers';
import {BaseRepository} from '../../../db';
import sinon from 'sinon';

const exchangeRepository = new BaseRepository();

describe('Exchange Controller - budgetCheck', () => {
	test('budgetCheck - only C1 passes', () => {
		const exchange = new Exchange();
		const result = exchange.budgetCheck([{
			company_id: 'C1',
			budget: 10
		},
		{
			company_id: 'C2',
			budget: 1
		},
		{
			company_id: 'C3',
			budget: 9
		}
		], 10);
		expect(result).toMatchSnapshot();
	});

	test('budgetCheck - everyone passes', () => {
		const exchange = new Exchange();
		const result = exchange.budgetCheck([{
			company_id: 'C1',
			budget: 10
		},
		{
			company_id: 'C2',
			budget: 15
		},
		{
			company_id: 'C3',
			budget: 90
		}
		], 10);
		expect(result).toMatchSnapshot();
	});

	test('budgetCheck - noone passes', () => {
		const exchange = new Exchange();
		const result = exchange.budgetCheck([{
			company_id: 'C1',
			budget: 0
		},
		{
			company_id: 'C2',
			budget: 4
		},
		{
			company_id: 'C3',
			budget: 3
		}
		], 10);
		expect(result).toMatchSnapshot();
	});
});

describe('baseBidCheck', () => {
	test('baseBidCheck - noone passes', () => {
		const exchange = new Exchange();
		const result = exchange.baseBidCheck([{
			company_id: 'C1',
			base_bid: 0.05
		},
		{
			company_id: 'C2',
			base_bid: 0.1
		},
		{
			company_id: 'C3',
			base_bid: 0.15
		}
		], 0.02);
		expect(result).toMatchSnapshot();
	});

	test('baseBidCheck - everyone passes', () => {
		const exchange = new Exchange();
		const result = exchange.baseBidCheck([{
			company_id: 'C1',
			base_bid: 0.05
		},
		{
			company_id: 'C2',
			base_bid: 0.1
		},
		{
			company_id: 'C3',
			base_bid: 0.15
		}
		], 1);
		expect(result).toMatchSnapshot();
	});

	test('baseBidCheck - just C1 passes', () => {
		const exchange = new Exchange();
		const result = exchange.baseBidCheck([{
			company_id: 'C1',
			base_bid: 0.05
		},
		{
			company_id: 'C2',
			base_bid: 0.1
		},
		{
			company_id: 'C3',
			base_bid: 0.15
		}
		], 0.05);
		expect(result).toMatchSnapshot();
	});
});

describe('sortByHighestBid', () => {
	test('sortByHighestBid - C1, C3, C2', () => {
		const exchange = new Exchange();
		const result = exchange.sortByHighestBid([{
			company_id: 'C1',
			base_bid: 0.59
		},
		{
			company_id: 'C2',
			base_bid: 0.14
		},
		{
			company_id: 'C3',
			base_bid: 0.15
		}
		]);
		expect(result).toMatchSnapshot();
	});

	test('sortByHighestBid - C3, C2, C1', () => {
		const exchange = new Exchange();
		const result = exchange.sortByHighestBid([{
			company_id: 'C1',
			base_bid: 0.59
		},
		{
			company_id: 'C2',
			base_bid: 0.64
		},
		{
			company_id: 'C3',
			base_bid: 1
		}
		]);
		expect(result).toMatchSnapshot();
	});

	test('sortByHighestBid - C1, C2, C3', () => {
		const exchange = new Exchange();
		const result = exchange.sortByHighestBid([{
			company_id: 'C1',
			base_bid: 0.59
		},
		{
			company_id: 'C2',
			base_bid: 0.54
		},
		{
			company_id: 'C3',
			base_bid: 0.123
		}
		]);
		expect(result).toMatchSnapshot();
	});
});

describe('buyStock', () => {
	let sandbox, findAllStub, findAndUpdate;
	const exchange = new Exchange(exchangeRepository);
	beforeEach(() => {
		sandbox = sinon.createSandbox();
		findAllStub = sandbox.stub(exchangeRepository, 'findAll');
		findAndUpdate = sandbox.stub(exchangeRepository, 'findAndUpdate');
	});

	afterEach(() => sandbox.restore());

	test('buyStock promise err - error in server during query', async () => {
		findAllStub.returns({ error: true });
		const result = await exchange.buyStock({});
		expect(result).toMatchSnapshot();
	});

	test('buyStock - No Companies Passed from Targeting', async () => {
		findAllStub.returns({ result: [] });
		const result = await exchange.buyStock({});
		expect(result).toMatchSnapshot();
	});

	test('buyStock - No Companies Passed from Budget', async () => {
		findAllStub.returns({
			result: [{
				company_id: 'C1',
				budget: 0.1
			}]
		});
		const result = await exchange.buyStock({BaseBid: 100});
		expect(result).toMatchSnapshot();
	});

	test('buyStock - No Companies Passed from BaseBid check', async () => {
		findAllStub.returns({
			result: [{
				company_id: 'C1',
				budget: 1,
				base_bid: 0.5
			}]
		});
		const result = await exchange.buyStock({BaseBid: 40});
		expect(result).toMatchSnapshot();
	});

	test('buyStock - Winner C1', async () => {
		findAllStub.returns({
			result: [{
				company_id: 'C1',
				budget: 1,
				base_bid: 0.5
			}]
		});
		findAndUpdate.returns({});
		const result = await exchange.buyStock({BaseBid: 50});
		expect(result).toMatchSnapshot();
	});

	test('buyStock - Error in Server while updating', async () => {
		findAllStub.returns({
			result: [{
				company_id: 'C1',
				budget: 1,
				base_bid: 0.5
			}]
		});
		findAndUpdate.returns({error: true});
		const result = await exchange.buyStock({BaseBid: 50});
		expect(result).toMatchSnapshot();
	});
});