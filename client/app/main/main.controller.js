'use strict';
var ideaId = '';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeIdeas = [];
      this.contests = [];
      this.feedbacks = [];
      this.comments = [];
      this.messages = [];
      this.commentsLength = [];
      this.isLoggedIn = Auth.isLoggedIn;
      this.getCurrentUser = Auth.getCurrentUser;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('idea');
      });
      
      $scope.isMyItem = function(item){
        return (Auth.isLoggedIn() && item.user && item.user._id === Auth.getCurrentUser().name) || Auth.isAdmin;
      };
      
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
        this.$http.get('/api/ideas')
          .then(response => {
            this.awesomeIdeas = response.data;
            this.socket.syncUpdates('idea', this.awesomeIdeas);
          }),
        this.$http.get('/api/contests')
          .then(response => {
            this.contests = response.data;
            this.socket.syncUpdates('contest', this.contests);
          }),
        this.$http.get('/api/feedbacks')
          .then(response => {
            this.feedbacks = response.data;
            this.socket.syncUpdates('feedback', this.feedbacks);
          }),
        this.$http.get('/api/comments')
          .then(response => {
            this.comments = response.data;
            this.socket.syncUpdates('comment', this.comments);
          }),
        this.$http.get('/api/messages')
          .then(response => {
            this.messages = response.data;
            this.socket.syncUpdates('message', this.messages);
        })]);
         this.$http.get('/api/comments')
        .then(response => {
          this.commentsLength = response.data.filter(this.isRelatedToIdea); 
          this.socket.syncUpdates('comment', this.comments);
      }); 
    }
    
    addIdea() {
      if (this.newIdea) {
        this.$http.post('/api/ideas', {
          name: this.newIdea,
          info: this.newIdeaInfo,
        });
        this.newIdea = '';
        this.newIdeaInfo = '';
      }
    }

    addContest() {
      if (this.newContest) {
        this.$http.post('/api/contests', {
          name: this.newContest,
          info: this.newContestInfo,
          privacy: this.newContestPrivacy,
          image: this.newContestImage,
          rewards: this.newContestRewards,
          documents: this.newContestDoc,
          monetaryRewards: this.newContestMonetaryRewards
        });
        this.newContest = '';
        this.newContestInfo = '';
        this.newContestPrivacy = '';
        this.newContestImage = '';
        this.newContestRewards = '';
        this.newContestDoc = '';
        this.newContestMonetaryRewards = '';
      }
    }

    addComment() {
      if (this.newComment) {
        this.$http.post('/api/comments', {
          comment: this.newComment
        });
      }
    }
    
    
    isRelatedToIdea(commentObj) {
      return commentObj.idea === ideaId;
    }
  
    addFeedback(opinion, ideaId) {
      if (opinion && ideaId) {
        this.$http.post('/api/feedbacks', {
          opinion: opinion,
          idea: ideaId
        });
      }
      
    }

    addMessage() {
      if (this.newMessage) {
        this.$http.post('/api/messages', {
          name: this.newMessage
        });
        this.newMessage = '';
      }
    }

    deleteIdea(idea) {
      this.$http.delete('/api/ideas/' + idea._id);
    }
    
    deleteContest(contest) {
      this.$http.delete('/api/contests/' + contest._id);
    }

    deleteFeedback(feedback) {
      this.$http.delete('/api/feedbacks/' + feedback._id);
    }

    deleteMessage(message) {
      this.$http.delete('/api/messages/' + message._id);
    }
    
    // this counts total number of Dim/Bright for each idea 
    getVoteCount(opinion, ideaId){
      var count = 0;
      
      for ( var x = 0 ; x < this.feedbacks.length ; x++ )
      {
        if (this.feedbacks[x].idea === ideaId && this.feedbacks[x].opinion === opinion)
        {
          count++;  
        }
      }
      return count;
    }
  }

  angular.module('ideaApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
