'use strict';
angular

.module('Mypokerleague')

.controller('leagueCtrl', ['$scope', '$firebase', '$stateParams', function($scope, $firebase, $stateParams) {
   $scope.activeLeague = $stateParams.leagueId;

	var playersRef = new Firebase("https://mypokerleague.firebaseio.com/"+$scope.activeLeague+"/Players");
	$firebase(playersRef).$on('value', function (obj) {
       $scope.playersNb = Object.keys(obj.snapshot.value).length ;
    })


}]);
