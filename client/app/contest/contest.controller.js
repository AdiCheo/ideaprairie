'use strict';
var ideaId = '';
(function(){


class ContestComponent {
  constructor($http, $scope, socket, $stateParams, Auth ) {
    this.$http = $http;
    this.socket = socket;
    ideaId = $stateParams.contestID;
    this.comments = [];
    this.awesomeThings = [];
    this.getCurrentUser = Auth.getCurrentUser;
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
       this.$http.get('/api/things/')
          .then(response => {
            this.awesomeThings = response.data.filter(this.isRelatedToIdea); // Filter only relevant comments
            this.socket.syncUpdates('thing', this.awesomeThings);
          });
         
  }
   addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing,
          info: this.newThingInfo,
          idea: ideaId
        });
        this.newThing = '';
        this.newThingInfo = '';
      }
    }
    addFeedback(opinion, thingId) {
      if (opinion && thingId) {
        this.$http.post('/api/feedbacks', {
          opinion: opinion,
          thing: thingId
        });
      }
    }
    createResponse(comment){
      $("#txtComment").attr("value","@"+comment.user); 
      //document.getElementById("txtComment").setAttribute("value","@admin");
    }

  
  addComment() {
    if (this.newComment) {
      this.$http.post('/api/comments', {
        comment: this.newComment,
        idea: ideaId,
        user: this.getCurrentUser().name 
      });
      //comment = '';
    }
  }

  isRelatedToIdea(commentObj) {
    return commentObj.idea === ideaId;
  }
  // checks if contest owner is vewing the site 
  isContestOwner(){
    if(this.ideaDetails.user.name == this.getCurrentUser().name){
      return true;
    }
    else{
      return false;
    }
  }
  
  deleteThing(thing) {
    this.$http.delete('/api/things/' + thing._id);
  }
  
}
angular.module('ideaApp')
  .component('contest', {
    templateUrl: 'app/contest/contest.html',
    controller: ContestComponent
  });

})();
