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

describe('POST /account/login', () => {
  it('Ok, invalid password.', async () => {
    const newUser = new Account({
      email: 'email@email.com',
      password: 'Test',
    });

    const res = await chai.request(app)
      .post('/api/account/login')
      .send(newUser);

    expect(res.status).to.equal(401);
  });

  it('Ok, valid password.', async () => {
    const newUser = new Account({
      email: 'email@email.com',
      password: 'TestUser123?',
    });

    const res = await chai.request(app)
      .post('/api/account/login')
      .send(newUser);

    expect(res.status).to.equal(201);
  });
});
