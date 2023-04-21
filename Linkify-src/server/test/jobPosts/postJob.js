process.env.NODE_ENV = 'test';

const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');
const Job = require('../../models/jobPostModel');

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

describe('POST /user/jobPosts', () => {
  it('should create a new job post', async () => {
    const newJob = new Job({
      title: "New job test",
      company: "Google test",
      location: "Laval test",
      salary: "$40/hour",
      descripton: "Good time good work",
      skill: ['java test'],
      postedBy: 'Test User',
      postedOn: '2023-03-14',
      isExternal: true,
      externalLink: 'www.google.com',
      status: 'active',
    });

    const res = await chai.request(app)
      .post('/api/user/jobPosts')
      .send(newJob);

    expect(res.status).to.equal(201);
    expect(res.body.title).to.equal(newJob.title);
  });
});
