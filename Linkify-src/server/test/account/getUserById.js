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

describe('GET /api/account/getUser', () => {
    it('OK, getting user by id', async () => {
        const userId = '6432d2b209b95ad6aafe0fce';
        const newUser = new Account({
            _id: userId,
        });
        const res = await request(app)
            .get('/api/account/getUser')
            .send({ id: newUser._id });

        expect(res).to.have.status(200);
    });

    it('OK, trying to get an invalid user', async () => {
        const userId = '6432d2b209b95ad6aafs0fce';
        const newUser = new Account({
            _id: userId,
        });
        const res = await request(app)
            .get('/api/account/getUser')
            .send({ id: newUser._id });

        expect(res).to.have.status(401);
    });
});

describe('GET /api/account/userByMail', () => {
    it('OK, getting user by email', async () => {
        const userEmail = 'githubtest1@email.com';
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