'use strict';

process.env.NODE_ENV = 'test';

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const knex = require('../db/knex');

const should = chai.should();

chai.use(chaiHttp);

describe('API Routes', () => {

  beforeEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      knex.migrate.latest()
      .then(() => {
        return knex.seed.run()
        .then(() => {
          done();
        });
      });
    });
  });

  afterEach((done) => {
    knex.migrate.rollback()
    .then(() => {
      done();
    });
  });

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
        res.body[0].email.should.equal('matt@lax.com');
        res.body[0].should.have.property('bio');
        res.body[0].bio.should.equal('This is a relatively short bio.');
        res.body[0].should.have.property('super_user');
        res.body[0].super_user.should.equal(true);
        done();
      });
    });
  });

  describe('GET /api/v1/users/:id', () => {
    it('should return one user', (done) => {
      chai.request(server)
      .get('/api/v1/users/2')
      .end((err, res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Brian Gordon');
        res.body.should.have.property('email');
        res.body.email.should.equal('brian@lax.com');
        res.body.should.have.property('bio');
        res.body.bio.should.equal('This is a relatively short bio.');
        res.body.should.have.property('super_user');
        res.body.super_user.should.equal(false);
        done();
      });
    });
  });

  describe('POST /api/v1/users', () => {
    it('should create a new user', (done) => {
      chai.request(server)
      .post('/api/v1/users')
      .send({
        name: 'Hannah Carstens',
        email: 'hannah@lax.com',
        bio: 'This is a relatively short bio.'
      })
      .end((err,res) => {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('object');
        res.body.should.have.property('name');
        res.body.name.should.equal('Hannah Carstens');
        res.body.should.have.property('email');
        res.body.email.should.equal('hannah@lax.com');
        res.body.should.have.property('bio');
        res.body.bio.should.equal('This is a relatively short bio.');
        res.body.should.have.property('super_user');
        res.body.super_user.should.equal(false);
        done();
      });
    });
  });

  // describe('PUT /api/v1/users/:id', () => {
  //   it('should update a user by id', (done) => {
  //     chai.request(server)
  //     .put('/api/v1/users/1')
  //     .send({
  //       name: 'Matty G',
  //       email: 'mattyice@lax.com',
  //       bio: 'This is a relatively horter biogrpahy.'
  //     })
  //     .end((err, res) => {
  //       res.body.should.have.status(200);
  //       res.should.be.json;
  //       res.body.should.be.a('object');
  //       res.body.should.have.property('name');
  //       res.body.name.should.equal('Matty G');
  //       res.body.sjould.have.property('email');
  //       res.body.email.should.equal('mattyice@lax.com');
  //       res.body.should.have.property('bio');
  //       res.body.bio.should.equal('This is a relatively horter biogrpahy.');
  //       res.body.should.have.property('super_user');
  //       res.body.super_user.should.equal(true);
  //       done();
  //     });
  //   });
  // });

  describe('PUT /api/v1/users/:id', () => {
  it('should update a user', (done) => {
    chai.request(server)
    .put('/api/v1/users/1')
    .send({
      name: 'Matty G',
      email: 'mattyice@lax.com',
      bio: 'This is a relatively horter biogrpahy.'
    })
    .end((err, res) => {
      res.should.have.status(200);
      res.should.be.json;
      res.body.should.be.a('object');
      res.body.should.have.property('name');
      res.body.name.should.equal('Matty G');
      res.body.should.have.property('email');
      res.body.email.should.equal('mattyice@lax.com');
      res.body.should.have.property('bio');
      res.body.bio.should.equal('This is a relatively horter biogrpahy.');
      res.body.should.have.property('super_user');
      res.body.super_user.should.equal(true);
      done();
    });
  });
});

});
