'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var contestCtrlStub = {
  index: 'contestCtrl.index',
  show: 'contestCtrl.show',
  create: 'contestCtrl.create',
  update: 'contestCtrl.update',
  destroy: 'contestCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var contestIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './contest.controller': contestCtrlStub
});

describe('Contest API Router:', function() {

  it('should return an express router instance', function() {
    expect(contestIndex).to.equal(routerStub);
  });

  describe('GET /api/contests', function() {

    it('should route to contest.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'contestCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/contests/:id', function() {

    it('should route to contest.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'contestCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/contests', function() {

    it('should route to contest.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'contestCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/contests/:id', function() {

    it('should route to contest.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'contestCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/contests/:id', function() {

    it('should route to contest.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'contestCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/contests/:id', function() {

    it('should route to contest.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'contestCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
