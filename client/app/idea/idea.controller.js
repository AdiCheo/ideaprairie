'use strict';

(function(){

class IdeaComponent {
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.socket = socket;
    this.id = $stateParams.id;
  }
  
  $onInit() {
    this.$http.get('/api/things/' + this.id)
      .then(response => {
        this.ideaDetails = response.data;
        this.socket.syncUpdates('thing', this.ideaDetails);
      });
  }
}

angular.module('ideaApp')
  .component('idea', {
    templateUrl: 'app/idea/idea.html',
    controller: IdeaComponent
  });

})();
