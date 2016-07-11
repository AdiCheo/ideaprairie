'use strict';

var ideaId = '';

(function(){

class IdeaComponent {
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.socket = socket;
    ideaId = $stateParams.id;
    this.comments = [];
    this.commentsLength = 0;
  }
  
  $onInit() {
    this.$http.get('/api/things/' + ideaId)
      .then(response => {
        this.ideaDetails = response.data;
        this.socket.syncUpdates('thing', this.ideaDetails);
      });
    this.$http.get('/api/comments')
      .then(response => {
        this.comments = response.data.filter(this.isRelatedToIdea); // Filter only relevant comments
        this.commentsLength = this.comments.length; // Filter only relevant comments and get length
        this.socket.syncUpdates('comment', this.comments);
    });
  }
  
  
  addComment() {
    if (this.newComment) {
      this.$http.post('/api/comments', {
        comment: this.newComment,
        idea: ideaId
      });
      this.newComment = '';
      this.commentsLength++;
    }
  }

  isRelatedToIdea(commentObj) {
    return commentObj.idea === ideaId;
  }
}

angular.module('ideaApp')
  .component('idea', {
    templateUrl: 'app/idea/idea.html',
    controller: IdeaComponent
  });

})();
