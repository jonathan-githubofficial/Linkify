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

describe('GET /groups/getGroupById', () => {
  it('should get a correct group', async () => {
    const newGroup = new Group({
      _id: '642717c06052d59cd6deb7e8',
    });

    const res = await chai.request(app)
      .get('/api/groups/getGroupById')
      .send({ id: newGroup._id });

    expect(res.status).to.equal(200);
  });

  it('Ok, trying to get an invalid group by id', async () => {
    const newGroup = new Group({
      _id: '642717ge06052d59cd6deb7e8',
    });

    const res = await chai.request(app)
      .get('/api/groups/getGroupById')
      .send({ id: newGroup._id });

    expect(res.status).to.equal(200);
  });
});
