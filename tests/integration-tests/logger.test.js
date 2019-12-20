const mocha = require('mocha');
const chai = require('chai');
const axios = require('axios');

const {server} = require('rapidify-core');
const logger = require('../../dist/logger').default;

logger(server);

describe('[INTEGRATION TEST] #1: Logging Test', () => {
  /*
    SET MONGO_DB_URL prior to running test,
    to stop connect() from throwing undefined/invalid string error.
  */
  process.env.MONGO_DB = 'mock-logger';
  process.env.MONGO_DB_USER = 'test_user1';
  process.env.MONGO_DB_PASSWORD = 'password';
  process.env.MONGO_DB_URL = 'mongodb://test_user1:password@127.0.0.1:27017/mock-logger?retryWrites=true';

  beforeEach((done) => setTimeout(done, 3000));

  it('should log responses to database against failed requests', async () => {
    const testURL = 'http://localhost:9000/test-not-found';

    let reply;

    try {
      reply = await axios.get(testURL);
    } catch (error) {
      chai.expect(reply).to.be.not.ok;
    }
  });
});
