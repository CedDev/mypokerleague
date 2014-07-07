'use strict';
angular.module('Mypokerleague.controllers', [])

.controller('AppCtrl',  ['$rootScope', '$scope', '$firebase', '$firebaseSimpleLogin', function($rootScope, $scope,$firebase, $firebaseSimpleLogin) {

}])

.controller('calendarCtrl', ['$scope', '$firebase', function($scope,$firebase) {
}])

.controller('calendarsCtrl', ['$scope', '$firebase', function($scope,$firebase) {

    $scope.activeSeason = 7;

  $scope.calendars = [
    { title: '09 septembre', id: 1 },
    { title: '30 septembre', id: 2 },
    { title: '21 octobre', id: 3 },
    { title: '15 novembre', id: 4 },
    { title: '01 decembre', id: 5 },
    { title: '22 decembre', id: 6 }
  ];
}])

.controller('loginCtrl',  ['$rootScope', '$scope', '$stateParams','$firebase', '$firebaseSimpleLogin', function($rootScope, $scope, $stateParams,$firebase, $firebaseSimpleLogin) {

    $scope.login = function(query) {
        var ref = new Firebase('https://mypokerleague.firebaseio.com');
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
            $rootScope.user = user;
            $scope.user = user;
            $scope.$apply();
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

.controller('newCalendarCtrl',  ['$scope', '$stateParams','$firebase',  function($scope, $stateParams,$firebase) {

    var calendarRef = new Firebase("https://mypokerleague.firebaseio.com/MSOP/Events/08/02");
    // Automatically syncs everywhere in realtime
    $scope.calendar = $firebase(calendarRef);
    //calendarRef.update({date: '14 sept', lieu: 12, rank :[{'name':'Will','points':2400,'kill':5},{'name':'Sylv1','points':1100,'kill':3}]});
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
}]);
