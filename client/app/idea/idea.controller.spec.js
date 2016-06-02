'use strict';

describe('Component: IdeaComponent', function () {

  // load the controller's module
  beforeEach(module('ideaApp'));

  var IdeaComponent, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($componentController, $rootScope) {
    scope = $rootScope.$new();
    IdeaComponent = $componentController('IdeaComponent', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).to.equal(1);
  });
});
