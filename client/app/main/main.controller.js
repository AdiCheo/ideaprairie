'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth) {
      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];
      this.campaigns = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('thing');
      });
      $scope.isMyThing = function(thing){
        return (Auth.isLoggedIn() && thing.user && thing.user._id===Auth.getCurrentUser()._id) || Auth.isAdmin;;
      };
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
      this.$http.get('/api/campaigns')
        .then(response => {
          this.campaigns = response.data;
          this.socket.syncUpdates('campaign', this.campaigns);
        });
    }

    addCampaign() {
      if (this.newCampaign) {
        this.$http.post('/api/campaigns', {
          name: this.newCampaign
        });
        this.newCampaign = '';
      }
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteCampaign(campaign) {
      this.$http.delete('/api/campaigns/' + campaign._id);
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('ideaApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
