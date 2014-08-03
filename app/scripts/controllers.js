'use strict';
angular

.module('Mypokerleague')

.controller('AppCtrl',  ['$rootScope', '$scope','$ionicNavBarDelegate', 'Auth', '$location', function($rootScope, $scope, $ionicNavBarDelegate,Auth,$location ) {
    $rootScope.activeLeague = "MSOP";
    $rootScope.activeSeason = "08";

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

.controller('homeCtrl', ['$scope', '$firebase', '$stateParams',function($scope,$firebase,$stateParams) {
}])

.controller('leaguesCtrl', ['$scope', '$firebase', '$stateParams',function($scope,$firebase,$stateParams) {
   $scope.leagues = [
    { name: 'MSOP', id: 1 }
  ];
}])

.controller('leagueCtrl', ['$scope', '$firebase', '$stateParams',function($scope,$firebase,$stateParams) {
   $scope.activeLeague = $stateParams.leagueId;
}])

.controller('playersCtrl', ['$scope', '$firebase', '$stateParams', '$ionicSlideBoxDelegate' , '$ionicPopup', function($scope,$firebase,$stateParams, $ionicSlideBoxDelegate, $ionicPopup) {

      $scope.data = {
        showDelete: false,
        currentSlide : 0
      };
      
      $ionicSlideBoxDelegate.enableSlide = false;

      var fbPlayers = new Firebase("https://mypokerleague.firebaseio.com/MSOP/Players");
      $scope.players = $firebase(fbPlayers);
          
      $scope.nextSlide = function() {
        var fbUsers = new Firebase("https://mypokerleague.firebaseio.com/users/");
        $scope.otherPlayers = $firebase(fbUsers);
        $ionicSlideBoxDelegate.next();
      }
      $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
      }

      $scope.addPlayer = function(key, player) {
          var newPlayer = new Firebase("https://mypokerleague.firebaseio.com/MSOP/Players/" + key);
          newPlayer.update({pseudo: player.pseudo});
          $ionicSlideBoxDelegate.previous();
      }

      $scope.removePlayer = function(key) {
        var confirmPopup = $ionicPopup.confirm({
           title: 'Retirer un joueur',
           template: 'Etes vous sur de vouloir retirer le joueur de la ligue?'
        });
       confirmPopup.then(function(res) {
           if(res) {
              var oldPlayer = new Firebase("https://mypokerleague.firebaseio.com/MSOP/Players/" + key);
              oldPlayer.remove();
           } else {
             
           }
        });
      }

      $scope.slideChanged = function(slide) {
        $scope.data.currentSlide = $ionicSlideBoxDelegate.currentIndex();
      };

}])

.controller('eventsCtrl', ['$scope', '$firebase','$stateParams',  '$ionicPopup', function($scope,$firebase,$stateParams,$ionicPopup) {
      $scope.activeLeague = $stateParams.leagueId;
      $scope.activeSeason = $stateParams.seasonId;

    var eventRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason );
    $scope.events = $firebase(eventRef);

    $scope.removeEvent = function(key) {
        var confirmPopup = $ionicPopup.confirm({
           title: 'Supprimer un tounoi',
           template: 'Etes vous sur de vouloir supprimer ce tournoi de la ligue?'
        });
       confirmPopup.then(function(res) {
           if(res) {
              var oldEvent = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/" + key);
              oldEvent.remove();
           } else {
             
           }
        });
      }


}])

.controller('eventCtrl', ['$scope', '$firebase', '$stateParams', '$ionicActionSheet', 'Auth', '$ionicSlideBoxDelegate' , '$ionicPopup', function($scope,$firebase,$stateParams,$ionicActionSheet, Auth, $ionicSlideBoxDelegate , $ionicPopup) {
      $scope.activeLeague = $stateParams.leagueId;
      $scope.activeSeason = $stateParams.seasonId;
      $scope.activeEvent = $stateParams.eventId;

      //récupérer event info
      var eventRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent );
      $scope.event = $firebase(eventRef);

      //recupérer player info
      $scope.user = Auth.getUser();
      if (typeof $scope.user.uid !== 'undefined') {
        var userRef = new Firebase("https://mypokerleague.firebaseio.com/users/" +$scope.user.uid);
        $scope.player = $firebase(userRef);
        var playerRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent+"/players/"+  $scope.user.uid);
        $scope.player.eventInfo = $firebase(playerRef);
      }




      /* Slide Management 
      ********************/
      $scope.data = {
        showDelete: false,
        currentSlide : 0
      };
      
      $ionicSlideBoxDelegate.enableSlide= false;

      $scope.slideTo = function(index) {
        switch (index) {
          case 0:

              break;
          case 1:
              $scope.slidePlayers();
              break;
          }
        $ionicSlideBoxDelegate.slide(index);
      }

      $scope.slideChanged = function(slide) {
        $scope.data.currentSlide = $ionicSlideBoxDelegate.currentIndex();
      };

      /* First Slide  
      ********************/

      $scope.showRegister = function() {

         // Show the action sheet
         var hideSheet = $ionicActionSheet.show({
           buttons: [
             { text: '<b>Présent</b>' },
             { text: '<small>je ne sais pas</small>' }
           ],
           destructiveText: 'Absent',
           titleText: 'S\'incrire au tournoi',
           cancelText: 'Annuler',
           cancel: function() {
                // add cancel code..
              },
           buttonClicked: function(index) {
              var playerRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent+"/players/"+  $scope.user.uid);
              playerRef.update({ pseudo: $scope.player.pseudo ,register:'ok', registerDate : GetCurrentDate() }, function(err) {
              });
             return true;
           },
           destructiveButtonClicked : function(index) {
              var playerRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent+"/players/"+  $scope.user.uid);
              playerRef.update({ pseudo: $scope.player.pseudo ,register:'nok', registerDate : GetCurrentDate() }, function(err) {
              });
             return true;
           }
         });
       };

      /* Second Slide  
      ********************/
      $scope.slidePlayers = function() {
            $scope.eventPlayers=[];
            $scope.absentPlayers=[];
            $scope.leaguePlayers=[];

            /* joueurs sans réponse 
            var leaguePlayers = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Players");
            $scope.leaguePlayers = $firebase(leaguePlayers);*/


            /* joueurs présents et absents */
            var eventPlayers = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent+"/players")
            eventPlayers.on('child_added', function(snap) {
                if( snap.val().register==="ok") {
                  $scope.eventPlayers.push(snap.val());
                } else {
                  $scope.absentPlayers.push(snap.val());
                }
                ;
            });



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

}])


.controller('eventEditCtrl',  ['$scope', '$stateParams','$firebase',  function($scope, $stateParams, $firebase) {
    $scope.activeLeague = $stateParams.leagueId;
    $scope.activeSeason = $stateParams.seasonId;
    $scope.activeEvent = $stateParams.eventId;
      
    var eventRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent );
    $scope.event = $firebase(eventRef);
    $scope.event.number= $scope.activeEvent;

    //$scope.event = {'number':'','name':'','date':'','time':'','location':''};

    $scope.saveEvent = function() {
      var eventRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason +"/" + $scope.event.number);
      eventRef.update({name: ''+ $scope.event.name, date: ''+  $scope.event.date, time: ''+  $scope.event.time,  lieu:''+ $scope.event.lieu});
    };
}])

.controller('eventLiveCtrl',  ['$scope', '$stateParams','$firebase',  function($scope, $stateParams, $firebase) {
    $scope.activeLeague = $stateParams.leagueId;
    $scope.activeSeason = $stateParams.seasonId;
    $scope.activeEvent = $stateParams.eventId;
      
    var eventRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent );
    $scope.event = $firebase(eventRef);
    $scope.event.number= $scope.activeEvent;

    $scope.initialCountdown= 1500;

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

      var playerRef = new Firebase("https://mypokerleague.firebaseio.com/users/" +$scope.uid);
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