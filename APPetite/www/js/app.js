// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic', 'starter.services', 'starter.controllers', 'leaflet-directive', 'ngCordova'])

.config(function($stateProvider, $urlRouterProvider) {
  $urlRouterProvider.otherwise('/index');
  
  $stateProvider
    .state('index', {
      url: "/index",
      templateUrl: 'templates/menu.html',
      controller: 'MenuController'
  })

    .state('play', {
      url: "/play",
      templateUrl: 'templates/play.html',
      controller: 'PlayController'
  })

    .state('map', {
      url: "/map",
      templateUrl: 'templates/map.html',
      controller: 'MapController'
  })

     .state('scores', {
      url: "/scores",
      templateUrl: 'templates/scores.html',
      controller: 'scoresController'
  })
    .state('options', {
      url: "/options",
      templateUrl: 'templates/options.html',
      controller: 'optionsController'
  })

  .state('characters', {
    url: "/characters",
    templateUrl: 'templates/characters.html'  
  })

  .state('languages', {
    url: "/languages",
    templateUrl: 'templates/languages.html'  
  })

  .state('credits', {
    url: "/credits",
    templateUrl: 'templates/credits.html'  
  })

  .state('awards', {
      url: "/awards",
      templateUrl: 'templates/awards.html'
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

      .state('wrong', {
      url: "/wrong",
      templateUrl: 'templates/wrong.html'
  })

});