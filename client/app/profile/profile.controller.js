'use strict';
var getCurrentUser = '';
(function(){

class ProfileComponent {
  constructor($http, $scope, socket, $stateParams, Auth) {
     this.$http = $http;
    this.socket = socket;
    getCurrentUser = Auth.getCurrentUser;
  }


  $onInit(){
  // Promise.all([
  //     this.$http.get('/api/user/'.getCurrentUser()._id)
  //       .then(response => {
  //         this.userDetails = response.data;
  //         this.socket.syncUpdates('user', this.userDetails);
  //       })
  //   ]);
  this.$http.get('/api/ideas/')
          .then(response => {
            this.awesomeIdeas = response.data.filter(this.isRelatedToIdea); // Filter only relevant comments
            this.socket.syncUpdates('idea', this.awesomeIdeas);
          });
  }
  addFeedback(opinion, ideaId) {
      if (opinion && ideaId) {
        this.$http.post('/api/feedbacks', {
          opinion: opinion,
          idea: ideaId
        });
      }
    }
    deleteIdea(idea) {
    this.$http.delete('/api/ideas/' + idea._id);
  }
  
  isRelatedToIdea(commentObj) {
    return commentObj.idea.user._id === getCurrentUser()._id;
    // return true;
  }
}

angular.module('ideaApp')
  .component('profile', {
    templateUrl: 'app/profile/profile.html',
    controller: ProfileComponent
  });
  
  

})();
