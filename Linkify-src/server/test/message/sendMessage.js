process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Message = require('../../models/messagesM');

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
  // it('Ok, connection message sucessfully', async () => {
  //   const sender = '6427dbdeab4d44c1034a1a59';
  //   const receiver = '642718e8c49656986273119f';
  //   // const receiver = '6427dbdeab4d44c1034a1a59';
  //   const senderUser = {
  //       _id: sender
  //   };

  //   const receiverUser = {
  //       _id: receiver
  //   }

  //   const senderId = senderUser._id;
  //   const receiverId = receiverUser._id;
  //   const message = "My first message";
  //   const time = "2023-04-01";

  //   const newMessage = new Message({ senderId , receiverId, message, time });

  //   const res = await chai.request(app)
  //     .post('/api/messages/postMessage')
  //     .send({senderId , receiverId, message, time});

  //   expect(res.status).to.equal(201);
  // });
  
});
