'use strict';
(function(){

class IdeaComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('ideaApp')
  .component('idea', {
    templateUrl: 'app/idea/idea.html',
    controller: IdeaComponent
  });

})();
