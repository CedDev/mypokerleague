'use strict';
angular

.module('Mypokerleague')

.controller('leagueCtrl', ['$scope', '$firebase', '$stateParams',function($scope,$firebase,$stateParams) {
   $scope.activeLeague = $stateParams.leagueId;
}]);
