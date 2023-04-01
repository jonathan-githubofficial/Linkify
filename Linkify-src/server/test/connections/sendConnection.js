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

describe('POST /user/connection/sendConnectionRequest', () => {
  it('Ok, connection sent sucessfully', async () => {
    const sender = '6427dbdeab4d44c1034a1a59';
    const receiver = '642718e8c49656986273119f';
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
      .post('/api/user/connection/sendConnectionRequest')
      .send({ senderId: senderUser._id, receiverId: receiverUser._id });

    expect(res.status).to.equal(200);
  });
});
