'use strict';
angular

.module('Mypokerleague')

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
}]);