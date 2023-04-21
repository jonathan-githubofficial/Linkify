process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Account = require('../../models/accountModel');

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

describe('POST /user/connection/acceptConnectionRequest', () => {
  it('Ok, connection accepted successfully', async () => {
    const sender = '64289d90ff91e950f52cee72'; // james
    const receiver = '6432d2b209b95ad6aafe0fce'; // githubtest1
    // const receiver = '6427dbdeab4d44c1034a1a59';
    const senderUser = {
        _id: sender
    };

    const receiverUser = {
        _id: receiver
    }

    const newConnection = {
      sender: senderUser._id,
      receiver: receiverUser._id,
    };

    const res = await chai.request(app)
      .post('/api/user/connection/acceptConnectionRequest')
      .send({ senderId: senderUser._id, receiverId: receiverUser._id });

    expect(res.status).to.equal(200);
  });
  
});
