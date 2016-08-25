'use strict';

(function(){

class ProfileComponent {
  constructor($http, $scope, socket, $stateParams, Auth) {
     this.$http = $http;
    this.socket = socket;
    this.getCurrentUser = Auth.getCurrentUser;
  }


  // $onInit(){
  // Promise.all([
  //     this.$http.get('/api/user/'.getCurrentUser()._id)
  //       .then(response => {
  //         this.userDetails = response.data;
  //         this.socket.syncUpdates('user', this.userDetails);
  //       })
  //   ]);
  // }
}

angular.module('ideaApp')
  .component('profile', {
    templateUrl: 'app/profile/profile.html',
    controller: ProfileComponent
  });
  
  

})();
