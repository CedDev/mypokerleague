'use strict';
angular.module('Mypokerleague')

.controller('AppCtrl',  ['$rootScope', '$scope','$ionicNavBarDelegate', 'Auth', '$location', function($rootScope, $scope, $ionicNavBarDelegate,Auth,$location ) {
    $scope.activeLeague = "MSOP";
    $scope.activeSeason = "08";

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.logout = function () {
      Auth.logout();
    };

    $scope.$on('$firebaseSimpleLogin:login', function () {
      if ($location.path() === '/app/login') {
        $location.path('/app/profil');
      }
    });

}])

.controller('eventCtrl', ['$scope', '$firebase', '$stateParams',function($scope,$firebase,$stateParams) {
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
        //console.log(snapshot.val());
    }, undefined, undefined, true);
}])

.controller('loginCtrl',  ['$rootScope', '$scope', '$stateParams','$firebase', '$firebaseSimpleLogin', function($rootScope, $scope, $stateParams,$firebase, $firebaseSimpleLogin) {
$scope.user= {};


    $scope.login = function(query) {
        var ref = new Firebase('https://mypokerleague.firebaseio.com');
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
          } else {
            // user is logged out                       
          }
        });
      auth.login('password', {
        email: $scope.user.email,
        password: $scope.user.password,
        rememberMe: true
      });
    };

    $scope.loginGoogle = function () {
        var ref = new Firebase('https://mypokerleague.firebaseio.com');
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
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
}])

.controller('toolsCtrl',  ['$scope', '$stateParams', function($scope, $stateParams) {

}])

.controller('AuthCtrl',  ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope,$scope, $location, Auth) {

    $scope.user ={};

    if (Auth.signedIn()) {
      $location.path('/app/events');
    }
 
    $scope.$on('$firebaseSimpleLogin:login', function () {
      $rootScope.user ={};
      $location.path('/app/profil');
    });
 
    $scope.login = function () {
      Auth.login($scope.user).then(function () {
      }, function (error) {
        $scope.error = error.toString();
      });
    };
 
    $scope.loginGoogle = function () {
      Auth.loginGoogle().then(function () {
      }, function (error) {
        $scope.error = error.toString();
      });
    };

    $scope.register = function () {
      Auth.register($scope.user).then(function (authUser) {
        console.log('register ok');
        $location.path('/');
      }, function (error) {
        console.log(error);
        $scope.error = error.toString();
      });
    };
  }])

.controller('profilCtrl',  ['$rootScope', '$scope', '$location', 'Auth', '$firebase', function ($rootScope, $scope, $location, Auth, $firebase) {
      
      $scope.user = Auth.getUser();
      $scope.uid = ($scope.user) ? $scope.user.uid:'undefined';

      OfflineFirebase.restore();
      var playerRef = new OfflineFirebase("https://mypokerleague.firebaseio.com/users/" +$scope.uid);
      $scope.player = $firebase(playerRef);

      playerRef.update({ lastConn : GetCurrentDate()}, function(err) {
      });

      function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@'))||'');
      }

      function ucfirst (str) {
        // credits: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      }

      function GetCurrentDate() {
          // Today date time which will used to set as default date.
          var todayDate = new Date();
          todayDate = todayDate.getFullYear() + "-" +
                         ("0" + (todayDate.getMonth() + 1)).slice(-2) + "-" +
                         ("0" + todayDate.getDate()).slice(-2) + " " + ("0" + todayDate.getHours()).slice(-2) + ":" +
                         ("0" + todayDate.getMinutes()).slice(-2);
   
          return todayDate;
      }

      $scope.saveUser = function () {

        //mise à jour de la date de création si inexisante
        if ($scope.player.registerDate === undefined) {
          playerRef.update({ registerDate : GetCurrentDate()}, function(err) {
          });
        }

        playerRef.update(
          {
            pseudo: ''+ $scope.player.pseudo,
            realName:  ''+ $scope.player.realName, 
            email: $scope.user.email,
            mobile:  ''+ $scope.player.mobile, 
            address:  ''+ $scope.player.address
          }, function(err) {});
      };
  }]);