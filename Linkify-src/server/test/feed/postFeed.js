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
  // it('Ok, should create a new feed', async () => {
  //   const userId = '642718e8c49656986273119f';
  //   const user = {
  //     _id: userId,
  //   };
  //   const newFeed = new Feed ({
  //     title: 'Test title',
  //     poster: user._id,
  //     name: 'Test post',
  //     postedOn: '2023-04-01',
  //     description: 'Something really good.',
  //     status: 'active',
  //     tags: null,
  //   });

  //   const res = await chai.request(app)
  //     .post('/api/user/feed/postFeed')
  //     .send(newFeed);

  //   expect(res.status).to.equal(201);
  // });
});
