process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Feed = require('../../models/feedsModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;

const app = require('../../server.js');
const { connectDB, close } = require('../../config/mockConnectDB');

let mongoServer;

before(async () => {
  mongoServer = await MongoMemoryServer.create();
  const mongoUri = mongoServer.getUri();
  await connectDB(mongoUri);
});

after(async () => {
  await close();
  await mongoServer.stop();
});

describe('POST /user/feed/postFeed', () => {
  it('Ok, should create a new feed', async () => {
    const userId = '6432d2b209b95ad6aafe0fce';
    const description = 'Something really good test.';

    const newFeed = new Feed ({
      userId: userId,
      description: 'Something really good test.',
    });

    const res = await chai.request(app)
      .post('/api/user/feed/postFeed')
      .send({userId, description});

    expect(res.status).to.equal(201);
  });
});