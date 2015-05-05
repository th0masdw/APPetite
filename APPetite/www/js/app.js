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
});
