const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let mongoServer;
let mongoUri;

const connectDB = async () => {
  if (mongoose.connection.readyState === 0) {
    mongoServer = await MongoMemoryServer.create();
    mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
};

const close = async () => {
  if (mongoose.connection.readyState !== 0) {
    // await mongoose.connection.dropDatabase();
    // await mongoose.connection.close();
    await mongoose.disconnect();
  }
  if (mongoServer) {
    // await mongoServer.stop();
    await mongoServer.disconnect();
  }
};

module.exports = { connectDB, close };
