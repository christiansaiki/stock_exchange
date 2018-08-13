# Stock Exchange

- [Stock Exchange](#stock-exchange)
  - [Installing](#installing)
  - [Logging](#logging)
  - [Dependencies](#dependencies)
  - [Running locally](#running-locally)
  - [Testing](#testing)

## Installing
``` bash
git clone git@github.com:christiansaiki/stock_exchange.git
cd stock_exchange
npm install
```     

## Logging
We are using the [PinoJS](https://github.com/pinojs/pino) library in order to handle the logs

## Dependencies
- MongoDB
- npm v6+
- Node v8+

## Running locally

If you want to run it locally, you have to install MongoDB in your OS and then run `mongod`

If it is the first time running the project you will have install all node_modules with:
``` bash
npm install
```

Finally, to run:

``` bash
npm run dev
```

## Testing
- We are using [Jest](https://jestjs.io/) with [snapshot testing](https://jestjs.io/docs/en/snapshot-testing).
- To run the tests just enter `npm test`