'use strict';
var ideaId = '';
(function(){


class ContestComponent {
  constructor($http, $scope, socket, $stateParams) {
    this.$http = $http;
    this.socket = socket;
    ideaId = $stateParams.contestID;
    this.comments = [];
    this.awesomeThings = [];
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
      $("#txtComment").attr("value","@admin"); // this hard coded text will have to be changed 
      //document.getElementById("txtComment").setAttribute("value","@admin");
    }

  
  addComment() {
    if (this.newComment) {
      this.$http.post('/api/comments', {
        comment: this.newComment,
        idea: ideaId
      });
      comment = '';
    }
  }

  isRelatedToIdea(commentObj) {
    return commentObj.idea === ideaId;
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
