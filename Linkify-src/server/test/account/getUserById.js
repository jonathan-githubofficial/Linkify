const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = require('supertest');

const app = require('../../server.js');
const conn = require('../../config/connectDB.js');

const Account = require('../../models/accountM');


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

describe('GET /api/account/getUser', () => {
    it('OK, getting user by id', async () => {
        const userId = '642718e8c49656986273119f';
        const newUser = new Account({
            _id: userId,
        });
        const res = await request(app)
            .get('/api/account/getUser')
            .send({ id: newUser._id });

        expect(res).to.have.status(200);
    });
});

