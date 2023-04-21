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

describe('PUT /messages/deletemessage', () => {
  it('Ok, message deleted sucessfully', async () => {
    const id = '64421112aa0ca173f9dc10c3'


    const res = await chai.request(app)
      .put(`/api/messages/deletemessage/${id}`)

    expect(res.status).to.equal(200);
  });
  
});
