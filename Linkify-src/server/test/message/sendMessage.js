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

describe('POST /messages/postMessage', () => {
  it('Ok, message sent sucessfully', async () => {
    const sender = '64289d90ff91e950f52cee72';
    const receiver = '6432d2b209b95ad6aafe0fce';
    const message = "My first message";
    const time = "2023-04-01";

    const newMessage = new Message({ sender , receiver, message, time });

    const res = await chai.request(app)
      .post('/api/messages/postMessage')
      .send(newMessage);

    expect(res.status).to.equal(201);
    expect(res.body.message).to.equal(newMessage.message);
  });
  
});
