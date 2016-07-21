'use strict';

var app = require('../..');
import request from 'supertest';

var newContest;

describe('Contest API:', function() {

  describe('GET /api/contests', function() {
    var contests;

    beforeEach(function(done) {
      request(app)
        .get('/api/contests')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contests = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(contests).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/contests', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/contests')
        .send({
          name: 'New Contest',
          info: 'This is the brand new contest!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newContest = res.body;
          done();
        });
    });

    it('should respond with the newly created contest', function() {
      expect(newContest.name).to.equal('New Contest');
      expect(newContest.info).to.equal('This is the brand new contest!!!');
    });

  });

  describe('GET /api/contests/:id', function() {
    var contest;

    beforeEach(function(done) {
      request(app)
        .get('/api/contests/' + newContest._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          contest = res.body;
          done();
        });
    });

    afterEach(function() {
      contest = {};
    });

    it('should respond with the requested contest', function() {
      expect(contest.name).to.equal('New Contest');
      expect(contest.info).to.equal('This is the brand new contest!!!');
    });

  });

  describe('PUT /api/contests/:id', function() {
    var updatedContest;

    beforeEach(function(done) {
      request(app)
        .put('/api/contests/' + newContest._id)
        .send({
          name: 'Updated Contest',
          info: 'This is the updated contest!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedContest = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedContest = {};
    });

    it('should respond with the updated contest', function() {
      expect(updatedContest.name).to.equal('Updated Contest');
      expect(updatedContest.info).to.equal('This is the updated contest!!!');
    });

  });

  describe('DELETE /api/contests/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/contests/' + newContest._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when contest does not exist', function(done) {
      request(app)
        .delete('/api/contests/' + newContest._id)
        .expect(404)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

  });

});
