process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Company = require('../../models/companyM');

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

describe('POST /companies/createCompany', () => {
  it('OK, should create a new company', async () => {
    const newCompany = {
      name: 'Test event 3',
      description: 'This is a test event',
      address: 'Test Location',
    };

    const res = await chai.request(app)
      .post('/api/companies/createCompany')
      .send(newCompany);

    expect(res.status).to.equal(201);
    expect(res.body.name).to.equal(newCompany.name);
  });
});
