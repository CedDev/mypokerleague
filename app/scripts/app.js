'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Mypokerleague', ['ionic','firebase','pickadate'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.constant('FIREBASE_URL', 'https://mypokerleague.firebaseio.com/')

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
    })

    .state('app.home', {
      url: '/home',
      views: {
        'menuContent' :{
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('app.about', {
      url: '/about',
      views: {
        'menuContent' :{
          templateUrl: 'templates/about.html'
        }
      }
    })
    .state('app.leagues', {
      url: '/leagues',
      views: {
        'menuContent' :{
          templateUrl: 'templates/leagues.html',
          controller: 'leaguesCtrl'
        }
      }
    })

    .state('app.league', {
      url: '/league',
      views: {
        'menuContent' :{
          templateUrl: 'templates/league.html',
          controller: 'leagueCtrl'
        }
      }
    })

    .state('app.seasons', {
      url: '/seasons',
      views: {
        'menuContent' :{
          templateUrl: 'templates/seasons.html',
          controller: 'seasonsCtrl'
        }
      }
    })

    .state('app.login', {
      url: '/login',
      views: {
        'menuContent' :{
          templateUrl: 'templates/login.html',
          controller: 'loginCtrl'
        }
      }
    })

    .state('app.register', {
      url: '/register',
      views: {
        'menuContent' :{
          templateUrl: 'templates/register.html',
          controller: 'AuthCtrl'
        }
      }
    })

    .state('app.profil', {
      url: '/profil',
      views: {
        'menuContent' :{
          templateUrl: 'templates/profil.html',
          controller: 'profilCtrl'
        }
      }
    })
    .state('app.tools', {
      url: '/tools',
      views: {
        'menuContent' :{
          templateUrl: 'templates/tools.html',
          controller: 'toolsCtrl'
        }
      }
    })

    .state('app.ranking', {
      url: '/ranking',
      views: {
        'menuContent' :{
          templateUrl: 'templates/ranking.html',
          controller: 'rankingCtrl'
        }
      }
    })
    .state('app.events', {
      url: '/events',
      views: {
        'menuContent' :{
          templateUrl: 'templates/events.html',
          controller: 'eventsCtrl'
        }
      }
    })

    .state('app.eventNew', {
      url: '/eventNew',
      views: {
        'menuContent' :{
          templateUrl: 'templates/eventNew.html',
          controller: 'eventNewCtrl'
        }
      }
    })
    .state('app.single', {
      url: '/events/:leagueId/:seasonId/:eventId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/event.html',
          controller: 'eventCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/home');
}]);

