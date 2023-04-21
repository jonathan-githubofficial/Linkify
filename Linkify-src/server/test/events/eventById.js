process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Event = require('../../models/eventModel');

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

describe('GET /events/getEventById', () => {
  it('should get a correct event', async () => {
    const newEvent = new Event({
      _id: '6427148b56fecdea4830e97b',
    });

    const res = await chai.request(app)
      .get('/api/events/getEventById')
      .send({ id: newEvent._id });

    expect(res.status).to.equal(200);
  });

  it('Ok, trying to get an invalid event by id', async () => {
    const newEvent = new Event({
      _id: '64vx7148b56fecdea4830e97b',
    });

    const res = await chai.request(app)
      .get('/api/events/getEventById')
      .send({ id: newEvent._id });

    expect(res.status).to.equal(401);
  });
});
