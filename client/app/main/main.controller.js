'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.campaigns = [];
      this.feedbacks = [];
      this.comments = [];
      this.messages = [];
      this.commentsLength = [];
      this.isLoggedIn = Auth.isLoggedIn;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
      
      $scope.isMyItem = function(item){
        return (Auth.isLoggedIn() && item.user && item.user._id === Auth.getCurrentUser()._id) || Auth.isAdmin;
      };
    }

    $onInit() {
      Promise.all([
        this.$http.get('/api/things')
          .then(response => {
            this.awesomeThings = response.data;
            this.socket.syncUpdates('thing', this.awesomeThings);
          }),
        this.$http.get('/api/campaigns')
          .then(response => {
            this.campaigns = response.data;
            this.socket.syncUpdates('campaign', this.campaigns);
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
          console.log('Printing commentsLength: ' + this.commentsLength);
      }); 
    }
    
    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing,
          info: this.newThingInfo,
        });
        this.newThing = '';
        this.newThingInfo = '';
      }
    }

    addCampaign() {
      if (this.newCampaign) {
        this.$http.post('/api/campaigns', {
          name: this.newCampaign,
          info: this.newCampaignInfo,
          privacy: this.newCampaignPrivacy,
          image: this.newCampaignImage,
          rewards: this.newCampaignRewards,
          documents: this.newCampaignDoc,
          monetaryRewards: this.newCampaignMonetaryRewards
        });
        this.newCampaign = '';
        this.newCampaignInfo = '';
        this.newCampaignPrivacy = '';
        this.newCampaignImage = '';
        this.newCampaignRewards = '';
        this.newCampaignDoc = '';
        this.newCampaignMonetaryRewards = '';
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
  
    addFeedback(opinion, thingId) {
      if (opinion && thingId) {
        this.$http.post('/api/feedbacks', {
          opinion: opinion,
          thing: thingId
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

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
    
    deleteCampaign(campaign) {
      this.$http.delete('/api/campaigns/' + campaign._id);
    }

    deleteFeedback(feedback) {
      this.$http.delete('/api/feedbacks/' + feedback._id);
    }

    deleteMessage(message) {
      this.$http.delete('/api/messages/' + message._id);
    }
  }

  angular.module('ideaApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
