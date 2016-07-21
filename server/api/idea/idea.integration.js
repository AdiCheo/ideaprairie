'use strict';

var app = require('../..');
import request from 'supertest';

var newIdea;

describe('Idea API:', function() {

  describe('GET /api/ideas', function() {
    var ideas;

    beforeEach(function(done) {
      request(app)
        .get('/api/ideas')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          ideas = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      expect(ideas).to.be.instanceOf(Array);
    });

  });

  describe('POST /api/ideas', function() {
    beforeEach(function(done) {
      request(app)
        .post('/api/ideas')
        .send({
          name: 'New Idea',
          info: 'This is the brand new idea!!!'
        })
        .expect(201)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          newIdea = res.body;
          done();
        });
    });

    it('should respond with the newly created idea', function() {
      expect(newIdea.name).to.equal('New Idea');
      expect(newIdea.info).to.equal('This is the brand new idea!!!');
    });

  });

  describe('GET /api/ideas/:id', function() {
    var idea;

    beforeEach(function(done) {
      request(app)
        .get('/api/ideas/' + newIdea._id)
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          idea = res.body;
          done();
        });
    });

    afterEach(function() {
      idea = {};
    });

    it('should respond with the requested idea', function() {
      expect(idea.name).to.equal('New Idea');
      expect(idea.info).to.equal('This is the brand new idea!!!');
    });

  });

  describe('PUT /api/ideas/:id', function() {
    var updatedIdea;

    beforeEach(function(done) {
      request(app)
        .put('/api/ideas/' + newIdea._id)
        .send({
          name: 'Updated Idea',
          info: 'This is the updated idea!!!'
        })
        .expect(200)
        .expect('Content-Type', /json/)
        .end(function(err, res) {
          if (err) {
            return done(err);
          }
          updatedIdea = res.body;
          done();
        });
    });

    afterEach(function() {
      updatedIdea = {};
    });

    it('should respond with the updated idea', function() {
      expect(updatedIdea.name).to.equal('Updated Idea');
      expect(updatedIdea.info).to.equal('This is the updated idea!!!');
    });

  });

  describe('DELETE /api/ideas/:id', function() {

    it('should respond with 204 on successful removal', function(done) {
      request(app)
        .delete('/api/ideas/' + newIdea._id)
        .expect(204)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          done();
        });
    });

    it('should respond with 404 when idea does not exist', function(done) {
      request(app)
        .delete('/api/ideas/' + newIdea._id)
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
