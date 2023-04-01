const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = require('supertest');

const app = require('../../server.js');
const conn = require('../../config/mockConnectDB.js');

before((done) => {
    conn.connectDB()
    .then(() => done())
    .catch((err) => done(err));
})

after((done) => {
    conn.close()
        .then(() => {
        done();
        })
        .catch((err) => done(err));
});

describe('GET /groups/getAllGroups', () => {
    it('OK, getting events', async () => {
        const res = await request(app).get('/api/groups/getAllGroups');
        expect(res).to.have.status(200);
        const body = res.body;
    });
});