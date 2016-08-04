'use strict';

var ideaId = '';

(function(){

class IdeaComponent {
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.socket = socket;
    ideaId = $stateParams.id;
    this.comments = [];
    this.feedbacks = [];
    
    
    $scope.myModel = [1, 2];
    $scope.myOptions = [
      {id: 1, title: 'Bright'},
      {id: 2, title: 'Dim'}
    ];
    
    $scope.myConfig = {
      create: true,
      valueField: 'id',
      labelField: 'title',
      delimiter: '|',
      placeholder: 'Pick something',
      onInitialize: function(selectize){
        // receives the selectize object as an argument
      },
      // maxItems: 1
    };
  }
  
  $onInit() {
    
    Promise.all([
      this.$http.get('/api/ideas/' + ideaId)
        .then(response => {
          this.ideaDetails = response.data;
          this.socket.syncUpdates('idea', this.ideaDetails);
        }),
      this.$http.get('/api/feedbacks')
        .then(response => {
          this.feedbacks = response.data.filter(this.isRelatedToIdea);
          this.socket.syncUpdates('feedback', this.feedbacks);
        }),
      this.$http.get('/api/comments')
        .then(response => {
          this.comments = response.data.filter(this.isRelatedToIdea); // Filter only relevant comments
          this.socket.syncUpdates('comment', this.comments);
      })]);
  }
  
  
  addComment() {
    if (this.newComment) {
      this.$http.post('/api/comments', {
        comment: this.newComment,
        idea: ideaId
      });
      this.newComment = '';
    }
  }

  isRelatedToIdea(obj) {
    return obj.idea === ideaId;
  }
}

angular.module('ideaApp')
  .component('idea', {
    templateUrl: 'app/idea/idea.html',
    controller: IdeaComponent
  });

})();
