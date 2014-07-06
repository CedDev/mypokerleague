'use strict';
// Ionic Starter App, v0.9.20

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('Mypokerleague', ['ionic', 'Mypokerleague.controllers','firebase'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.factory("ChatService", ["$firebase", function($firebase) {
    var ref = new Firebase("https://mypokerleague.firebaseio.com/chat");
    return $firebase(ref);
}])

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
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

    .state('app.ranking', {
      url: '/ranking',
      views: {
        'menuContent' :{
          templateUrl: 'templates/ranking.html',
          controller: 'rankingCtrl'
        }
      }
    })
    .state('app.calendars', {
      url: '/calendars',
      views: {
        'menuContent' :{
          templateUrl: 'templates/calendars.html',
          controller: 'calendarsCtrl'
        }
      }
    })

    .state('app.newcalendar', {
      url: '/newcalendar',
      views: {
        'menuContent' :{
          templateUrl: 'templates/newcalendar.html',
          controller: 'newCalendarCtrl'
        }
      }
    })
    .state('app.single', {
      url: '/calendars/:calendarId',
      views: {
        'menuContent' :{
          templateUrl: 'templates/calendar.html',
          controller: 'calendarCtrl'
        }
      }
    });
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/app/calendars');
});

