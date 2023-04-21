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

describe('PUT /events/join', () => {
  it('should get a correct event', async () => {
    const newEvent = new Event({
      _eventId: '64271b0dc78a163d16f39e04',
      memberId: '6432d2b209b95ad6aafe0fce',
    });

    const res = await chai.request(app)
      .put('/api/events/join')
      .send(newEvent);

    expect(res.status).to.equal(404);
  });

  it('Ok, trying to join an invalid event', async () => {
    const newEvent = new Event({
      eventId: '6asdf148b56fedddcdea4830e97b',
      memberId: '6432d2b209b95ad6aafe0fce',
    });

    const res = await chai.request(app)
      .put('/api/events/join')
      .send(newEvent);

    expect(res.status).to.equal(404);
  });
});
