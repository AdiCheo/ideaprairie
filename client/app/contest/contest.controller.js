'use strict';
(function(){

class ContestComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('ideaApp')
  .component('contest', {
    templateUrl: 'app/contest/contest.html',
    controller: ContestComponent
  });

})();
