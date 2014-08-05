'use strict';
angular

.module('Mypokerleague')

.controller('eventLiveCtrl',  ['$scope', '$stateParams','$firebase',  function($scope, $stateParams, $firebase) {
    $scope.activeLeague = $stateParams.leagueId;
    $scope.activeSeason = $stateParams.seasonId;
    $scope.activeEvent = $stateParams.eventId;
      
    var eventRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Events/"+$scope.activeSeason+"/"+ $scope.activeEvent );
    $scope.event = $firebase(eventRef);
    $scope.event.number= $scope.activeEvent;

    $scope.initialCountdown= 1500;
    $scope.smallBlind= 50;
    $scope.nextSmallBlind= 100;
    $scope.bigBlind= 100;
    $scope.nextBigBlind= 200;

}]);