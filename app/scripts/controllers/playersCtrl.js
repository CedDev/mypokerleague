'use strict';
angular

.module('Mypokerleague')

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
}]);