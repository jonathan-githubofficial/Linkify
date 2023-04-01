process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Account = require('../../models/accountM');

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

describe('POST /user/property/addSkill', () => {
  it('Ok, skill added sucessfully', async () => {
    const userId = '642718e8c49656986273119f';
    const newSkill = {
      _id: userId,
      skill: 'Test 2',
    };

    const res = await chai.request(app)
      .post('/api/user/property/addSkill/')
      .send({ id: newSkill._id, skill: newSkill.skill });

    expect(res.status).to.equal(200);
  });
});

describe('DELETE /user/property/deleteSkill ', () => {
  it('Ok, skill deleted sucessfully', async () => {
    const userId = '642718e8c49656986273119f';
    const newSkill = {
      _id: userId,
      skill: 'Test 1',
    };

    const res = await chai.request(app)
      .delete('/api/user/property/deleteSkill/')
      .send({ id: newSkill._id, skill: newSkill.skill });

    expect(res.status).to.equal(200);
  });
});

