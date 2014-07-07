'use strict';
angular.module('Mypokerleague.controllers', [])

.controller('AppCtrl',  ['$rootScope', '$scope', '$firebase', '$firebaseSimpleLogin', '$ionicNavBarDelegate', function($rootScope, $scope,$firebase, $firebaseSimpleLogin, $ionicNavBarDelegate) {
      $scope.activeLeague = "MSOP";
      $scope.activeSeason = "08";
 $scope.goBack = function() {
    $ionicNavBarDelegate.back();
  };
}])

.controller('eventCtrl', ['$scope', '$firebase', '$stateParams',function($scope,$firebase,$stateParams) {
  console.log($stateParams);
      $scope.activeLeague = $stateParams.leagueId;
      $scope.activeSeason = $stateParams.seasonId;
      $scope.activeEvent = $stateParams.eventId;

      OfflineFirebase.restore();
      var eventRef = new OfflineFirebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent );
      $scope.event = $firebase(eventRef);
}])

.controller('eventsCtrl', ['$scope', '$firebase', function($scope,$firebase) {

    OfflineFirebase.restore();
    var eventRef = new OfflineFirebase("https://mypokerleague.firebaseio.com/MSOP/Events/08/");
    // Automatically syncs everywhere in realtime
    $scope.events = $firebase(eventRef);
    eventRef.on('value', function(snapshot) {
        console.log(snapshot.val());
    }, undefined, undefined, true);
}])

.controller('loginCtrl',  ['$rootScope', '$scope', '$stateParams','$firebase', '$firebaseSimpleLogin', function($rootScope, $scope, $stateParams,$firebase, $firebaseSimpleLogin) {

    $scope.login = function(query) {
        var ref = new Firebase('https://mypokerleague.firebaseio.com');
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
            $rootScope.user = user;
            $scope.user = user;
            $scope.$apply();
          } else {
            // user is logged out                       
          }
        });
        auth.login('google', {
          rememberMe: true,
          scope: 'https://www.googleapis.com/auth/plus.login'
        });
    };
}])

.controller('newCalendarCtrl',  ['$scope', '$stateParams','$firebase',  function($scope, $stateParams, $firebase) {
    $scope.season = "08";
    $scope.event = {'number':null,'name':null,'date':null,'time':null,'location':null};

    $scope.saveEvent = function() {
      console.log($scope.event);
      var eventRef = new Firebase("https://mypokerleague.firebaseio.com/MSOP/Events/08/" + $scope.event.number);
      // Automatically syncs everywhere in realtime
      $scope.event = $firebase(eventRef);
      eventRef.update({name: $scope.event.name,date: $scope.event.date, time: $scope.event.time,  lieu: $scope.event.location, rank :[{}]});
    };
}])


.controller('rankingCtrl',  ['$scope', '$stateParams', function($scope, $stateParams) {
 $scope.ranks = [
    { title: 'Will', id: 1 },
    { title: 'sylvain', id: 2 },
    { title: 'Laure', id: 3 },
    { title: 'Guillaume', id: 4 },
    { title: 'Cedric', id: 5 },
    { title: 'Edouard', id: 6 }
  ];
}]);
