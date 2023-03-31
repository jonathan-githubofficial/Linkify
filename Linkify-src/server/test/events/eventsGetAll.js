const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = require('supertest');

const app = require('../../server.js');
const conn = require('../../config/connectDB.js');

before((done) => {
    conn.connectDB()
    .then(() => done())
    .catch((err) => done(err));
})

after((done) => {
    console.log('closing connection...');
    conn.close()
        .then(() => {
        console.log('connection closed');
        done();
        })
        .catch((err) => done(err));
});

describe('GET /events/getAllEvents', () => {
    it('OK, getting events', async () => {
        const res = await request(app).get('/api/events/getAllEvents');
        expect(res).to.have.status(200);
        const body = res.body;
    });
});