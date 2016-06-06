'use strict';

angular.module('ideaApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('contest', {
        url: '/contest',
        template: '<contest></contest>'
      });
  });
