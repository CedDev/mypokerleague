'use strict';
angular

.module('Mypokerleague')

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
}]);