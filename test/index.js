const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;
const mocha = require('mocha');
const { describe, it } = mocha;
const app = require('../src/app');

chai.use(chaiHttp);

const token = {
    teacher: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwicm9sZSI6IlRlYWNoZXIiLCJpYXQiOjE1OTQzNjc2NTB9.bKTbyzoUmm_oXTGH4FI0DztSXtqk9eR6dLg9p_5wYZE',
    admin: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwicm9sZSI6IkFkbWluIiwiaWF0IjoxNTk0MzY4NDI1fQ.zifHlWv4ojZ92gm1CgCXlXAZR19Y5B0mlraSuBhcRgs',
    owner: '',
    hq: '',
}


describe('Login function', () => {
    it('Fail with wrong username', () => {
        chai.request(app)
            .post('/api/v1/login')
            .send({ username: 'wrongUser', password: 'pw' })
            .then((res) => {
                expect(res).to.have.status(400);
                // expect(res.body.message).to.be.equal('hello world');
            })
            .catch((err) => {
                throw err;
            });
    })

    it('Fail with wrong password', () => {
        chai.request(app)
            .post('/api/v1/login')
            .send({ username: 'Charles', password: 'pw1' })
            .then((res) => {
                expect(res).to.have.status(400);
                // expect(res.body.message).to.be.equal('hello world');
            })
            .catch((err) => {
                throw err;
            });
    })

    it('Success with correct username', () => {
        chai.request(app)
            .post('/api/v1/login')
            .send({ username: 'Charles', password: 'pw' })
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res.body).to.have.own.property('token');
            })
            .catch((err) => {
                throw err;
            });
    })
})

describe('Teacher story', () => {
    it('Query with correct role', () => {
        chai.request(app)
            .get('/api/v1/tracking/teacher')
            .set('Authorization', token.teacher)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'application/json; charset=utf-8');
            })
            .catch((err) => {
                throw err;
            });
    })

    it('Query with correct role and get csv', () => {
        chai.request(app)
            .get('/api/v1/tracking/teacher/?format=csv')
            .set('Authorization', token.teacher)
            .then((res) => {
                expect(res).to.have.status(200);
                expect(res).to.have.header('content-type', 'text/csv');
            })
            .catch((err) => {
                throw err;
            });
    })

    it('Query fail with wrong role', () => {
        chai.request(app)
            .get('/api/v1/tracking/teacher')
            .set('Authorization', token.admin)
            .then((res) => {
                expect(res).to.have.status(401);
            })
            .catch((err) => {
                throw err;
            });
    })
})


// describe('First test', () => {
//     it('Hello world code 200 as expected', function (done) { // <= Pass in done callback
//         chai.request(app)
//             .get('/')
//             .end(function (err, res) {
//                 expect(res).to.have.status(200);
//                 expect(res.body.message).to.be.equal('hello world');
//                 done();                               // <= Call done to signal callback end
//             });
//     });
// })