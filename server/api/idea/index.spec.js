'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var ideaCtrlStub = {
  index: 'ideaCtrl.index',
  show: 'ideaCtrl.show',
  create: 'ideaCtrl.create',
  update: 'ideaCtrl.update',
  destroy: 'ideaCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var ideaIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './idea.controller': ideaCtrlStub
});

describe('Idea API Router:', function() {

  it('should return an express router instance', function() {
    expect(ideaIndex).to.equal(routerStub);
  });

  describe('GET /api/ideas', function() {

    it('should route to idea.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'ideaCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/ideas/:id', function() {

    it('should route to idea.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'ideaCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/ideas', function() {

    it('should route to idea.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'ideaCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/ideas/:id', function() {

    it('should route to idea.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'ideaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/ideas/:id', function() {

    it('should route to idea.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'ideaCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/ideas/:id', function() {

    it('should route to idea.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'ideaCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
