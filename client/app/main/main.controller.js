'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.campaigns = [];
      this.feedbacks = [];
      this.messages = [];
      this.isLoggedIn = Auth.isLoggedIn;

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
      $scope.isMyItem = function(item){
        return (Auth.isLoggedIn() && item.user && item.user._id===Auth.getCurrentUser()._id) || Auth.isAdmin;
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
        this.$http.get('/api/messages')
          .then(response => {
            this.messages = response.data;
            this.socket.syncUpdates('message', this.messages);
        })]);
    }
    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
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
          documents: this.newCampaignDoc
        });
        this.newCampaign = '';
        this.newCampaignInfo = '';
        this.newCampaignPrivacy = '';
        this.newCampaignImage = '';
        this.newCampaignRewards = '';
        this.newCampaignDoc = '';
      }
    }


    addFeedback() {
      if (this.newFeedback) {
        this.$http.post('/api/feedbacks', {
          name: this.newFeedback
        });
        this.newFeedback = '';
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
