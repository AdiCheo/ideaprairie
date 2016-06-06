'use strict';

describe('Component: ContestComponent', function () {

  // load the controller's module
  beforeEach(module('ideaApp'));

  var ContestComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    ContestComponent = $componentController('ContestComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
