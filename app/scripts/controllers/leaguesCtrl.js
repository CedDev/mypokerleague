'use strict';
angular

.module('Mypokerleague')

.controller('leaguesCtrl', ['$scope', '$firebase', '$stateParams',function($scope,$firebase,$stateParams) {
   $scope.leagues = [
    { name: 'MSOP', id: 1 }
  ];
}]);
