# Stock Exchange

- [Stock Exchange](#stock-exchange)
  - [Installing](#installing)
  - [Logging](#logging)
  - [Dependencies](#dependencies)
  - [Running locally](#running-locally)
  - [Making requests locally](#making-requests-locally)
  - [Alternative form of solving the exchange test](#alternative-form-of-solving-the-exchange-test)
  - [Testing](#testing)

## Installing
``` bash
git clone git@github.com:christiansaiki/stock_exchange.git
cd stock_exchange
npm install
```     

## Logging
We are using the [PinoJS](https://github.com/pinojs/pino) library in order to handle the logs.

Also I'm using [pino-tee](https://github.com/pinojs/pino-tee) in order to create the `exchange.log` file.

## Dependencies
- [MongoDB](https://docs.mongodb.com/manual/installation/)
- npm v6+
- [Node v8+](https://nodejs.org/en/)

## Running locally

If you want to run it locally, you have to install MongoDB in your OS and then run `mongod`

If it is the first time running the project you will have to run the scripts below:
``` bash
# to install the node_modules
npm install
# to populate the database
npm run populate
```

Finally, to run the application:

``` bash
npm start
```

## Making requests locally

The endpoint of the application is `http://localhost:3000/exchange`.

The query parameters are:
- countrycode
- Category
- BaseBid

An example of a GET request: `http://localhost:3000/exchange?BaseBid=10&Category=Automobile&countrycode=US`

## Alternative form of solving the exchange test

The endpoint of the application is `http://localhost:3000/alternative_exchange`.

The biggest difference in this alternative way is that I've put the entire logic of the application in the Mongoose query. 

The main caveat is that we cannot know why the company didn't pass, if it was because the targeting, budget or base_bid. 

Nevertheless the code is much simpler.

Hope you will like this alternative way too.

## Testing
- We are using [Jest](https://jestjs.io/) with [snapshot testing](https://jestjs.io/docs/en/snapshot-testing).
- To run the tests just enter `npm test`