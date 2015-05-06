// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.controllers', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  
  $stateProvider
    .state('index', {
      url: "/index",
      templateUrl: 'templates/start.html',
      controller: 'StartController'
  })

  .state('level3', {
      url: "/level3",
      templateUrl: 'templates/level3.html',
      controller: 'Level3Controller'
  })

  .state('game3', {
      url: "/game3",
      templateUrl: 'templates/game3.html',
      controller: 'game3Controller'
  })

});
