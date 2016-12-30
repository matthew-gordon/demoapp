'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../app');

chai.use(chaiHttp);

describe('API Routes', () => {

  describe('GET /api/v1/users', () => {
    it('should return all users', (done) => {
      chai.request(server)
      .get('/api/v1/users')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.length.should.equal(3);
        res.body[0].should.have.property('name');
        res.body[0].name.should.equal('Matt Gordon');
        res.body[0].should.have.property('email');
        res.body[0].email.should.equal('Matt@lax.com');
        res.body[0].should.have.property('bio');
        res.body[0].bio.should.equal('This is a relatively short bio.');
        res.body[0].should.have.property('super_user');
        res.body[0].super_user.should.equal(true);
        done();
      });
    });
  });

});
