'use strict';

angular.module('ideaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('idea', {
        url: '/idea',
        template: '<idea></idea>'
      });
  });
