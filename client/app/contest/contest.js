'use strict';

angular.module('ideaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contest', {
        url: '/contest/:contestID',
        template: '<contest></contest>'
      });
  });
