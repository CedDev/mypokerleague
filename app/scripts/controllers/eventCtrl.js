'use strict';
angular

.module('Mypokerleague')

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

}]);