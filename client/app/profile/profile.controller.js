'use strict';
(function(){

class ProfileComponent {
  constructor() {
    this.message = 'Hello';
  }
}

angular.module('ideaApp')
  .component('profile', {
    templateUrl: 'app/profile/profile.html',
    controller: ProfileComponent
  });

})();
