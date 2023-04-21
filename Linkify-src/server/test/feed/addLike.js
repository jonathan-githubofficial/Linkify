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

describe('POST /user/feed/addLike', () => {
  it('Ok, liked a post successfully', async () => {
    const id = '64421b600ab3c7812ab4708e';
    const like = '6432d2b209b95ad6aafe0fce';

    const res = await chai.request(app)
      .post('/api/user/feed/addLike')
      .send({id, like});

    expect(res.status).to.equal(200);
  });
});
