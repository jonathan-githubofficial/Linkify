process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Group = require('../../models/groupModel');

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

describe('POST /groups/createGroup', () => {
  it('should create a new group', async () => {
    const newGroup = new Group({
      name: 'Test group',
      description: 'This is a test group',
      status: true,
      creator: 'Test Creator'
    });

    const res = await chai.request(app)
      .post('/api/groups/createGroup')
      .send(newGroup);

    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(newGroup.name);
  });
});
