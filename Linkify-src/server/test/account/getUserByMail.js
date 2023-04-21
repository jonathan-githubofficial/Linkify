const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const expect = chai.expect;
const request = require('supertest');

const app = require('../../server.js');
const conn = require('../../config/connectDB.js');

const Account = require('../../models/accountModel');


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

describe('GET /api/account/userByMail', () => {
    it('OK, getting user by email', async () => {
        const userEmail = 'james@email.com';
        const newUser = new Account({
            email: userEmail,
        });
        const res = await request(app)
            .get('/api/account/userByMail')
            .send({ email: newUser.email });

        expect(res).to.have.status(401);
    });

    it('OK, getting user by an invalid email', async () => {
        const userEmail = 'wrongemail@email.com';
        const newUser = new Account({
            email: userEmail,
        });
        const res = await request(app)
            .get('/api/account/userByMail')
            .send({ email: newUser.email });

        expect(res).to.have.status(401);
    });
});