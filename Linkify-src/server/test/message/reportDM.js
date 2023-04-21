process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Message = require('../../models/messagesModel');

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

describe('PUT /messages/report', () => {
  it('Ok, message reported sucessfully', async () => {
    const messageId = '64421186023c6b74f1c9f311';
    const reportType = 'Spam';


    const res = await chai.request(app)
      .put(`/api/messages/report/${messageId}`)
      .send(reportType);

    expect(res.status).to.equal(200);
  });
  
});
