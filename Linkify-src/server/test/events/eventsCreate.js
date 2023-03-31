process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Event = require('../../models/eventM');

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

describe('POST /events/createEvent', () => {
  it('should create a new event', async () => {
    const newEvent = new Event({
      name: 'Test Event Mockgoose 1',
      description: 'This is a test event',
      location: 'Test Location',
      date: '2023-03-3',
      creator: 'Test Creator'
    });

    const res = await chai.request(app)
      .post('/api/events/createEvent')
      .send(newEvent);

    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(newEvent.name);
  });
});
