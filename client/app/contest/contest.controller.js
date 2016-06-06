'use strict';
(function(){


class ContestComponent {
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.socket = socket;
    ideaId = $stateParams.contestID;
    this.comments = [];
  }
  
  $onInit() {
    this.$http.get('/api/campaigns/' + ideaId)
      .then(response => {
        this.ideaDetails = response.data;
        this.socket.syncUpdates('thing', this.ideaDetails);
      });
      this.$http.get('/api/comments')
        .then(response => {
          this.comments = response.data.filter(this.isRelatedToIdea); // Filter only relevant comments
          this.socket.syncUpdates('comment', this.comments);
      });
  }
  
  addComment() {
    if (this.newComment) {
      this.$http.post('/api/comments', {
        comment: this.newComment,
        idea: ideaId
      });
    }
  }

  isRelatedToIdea(commentObj) {
    return commentObj.idea === ideaId;
  }
}
angular.module('ideaApp')
  .component('contest', {
    templateUrl: 'app/contest/contest.html',
    controller: ContestComponent
  });

})();
