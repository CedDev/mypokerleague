'use strict';
angular.module('Mypokerleague.controllers', [])

.controller('AppCtrl', function($scope) {
})

.controller('calendarsCtrl', function($scope) {
  $scope.calendars = [
    { title: '09 septembre', id: 1 },
    { title: '30 septembre', id: 2 },
    { title: '21 octobre', id: 3 },
    { title: '15 novembre', id: 4 },
    { title: '01 decembre', id: 5 },
    { title: '22 decembre', id: 6 }
  ];
})

.controller('calendarCtrl', function($scope, $stateParams) {
})

.controller('rankingCtrl', function($scope, $stateParams) {
 $scope.ranks = [
    { title: 'Will', id: 1 },
    { title: 'sylvain', id: 2 },
    { title: 'Laure', id: 3 },
    { title: 'Guillaume', id: 4 },
    { title: 'Cedric', id: 5 },
    { title: 'Edouard', id: 6 }
  ];
});
