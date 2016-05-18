'use strict';

angular.module('ideaApp.auth', ['ideaApp.constants', 'ideaApp.util', 'ngCookies', 'ui.router'])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
