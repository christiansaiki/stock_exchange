import server from '../../server';
const populate = require('../../db/populate');

describe('APP Testing', () => {
	beforeAll(() => {
		return populate(server.mongo);
	});

	afterAll((done) => {
		populate(server.mongo, true);
		server.app.close(done);
	});

	test('GET `/` route', done => {
		server.app.inject({
			method: 'GET',
			url: '/'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			done();
		});
	});

	test('GET `/exchange` route - return C1 - US, Automobile', done => {
		server.app.inject({
			method: 'GET',
			url: '/exchange?countrycode=US&Category=Automobile&BaseBid=10'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			expect(response.payload).toMatchSnapshot();
			done();
		});
	});

	test('GET `/exchange` route - return C2 - US, IT', done => {
		server.app.inject({
			method: 'GET',
			url: '/exchange?countrycode=US&Category=IT&BaseBid=30'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			expect(response.payload).toMatchSnapshot();
			done();
		});
	});

	test('GET `/exchange` route - return C3 - RU, IT', done => {
		server.app.inject({
			method: 'GET',
			url: '/exchange?countrycode=RU&Category=IT&BaseBid=10'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			expect(response.payload).toMatchSnapshot();
			done();
		});
	});

	test('GET `/exchange` route - return C2 - IN, Finance', done => {
		server.app.inject({
			method: 'GET',
			url: '/exchange?countrycode=IN&Category=Finance&BaseBid=30'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			expect(response.payload).toMatchSnapshot();
			done();
		});
	});

	test('GET `/exchange` route - No targeting - BR, Finance', done => {
		server.app.inject({
			method: 'GET',
			url: '/exchange?countrycode=BR&Category=Finance&BaseBid=30'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			expect(response.payload).toMatchSnapshot();
			done();
		});
	});

	test('GET `/exchange` route - No Budget - US, Finance', done => {
		server.app.inject({
			method: 'GET',
			url: '/exchange?countrycode=US&Category=Finance&BaseBid=210'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			expect(response.payload).toMatchSnapshot();
			done();
		});
	});

	test('GET `/exchange` route - No Base Bid - US, Finance', done => {
		server.app.inject({
			method: 'GET',
			url: '/exchange?countrycode=US&Category=Finance&BaseBid=9'
		}, (err, response) => {
			expect(err).toMatchSnapshot();
			expect(response.statusCode).toMatchSnapshot();
			expect(response.payload).toMatchSnapshot();
			done();
		});
	});
});
