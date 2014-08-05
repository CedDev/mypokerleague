'use strict';
angular

.module('Mypokerleague')

.controller('AppCtrl',  ['$rootScope', '$scope','$ionicNavBarDelegate', 'Auth', '$location', function($rootScope, $scope, $ionicNavBarDelegate,Auth,$location ) {
    $rootScope.activeLeague = "MSOP";
    $rootScope.activeSeason = "08";

    $scope.goBack = function() {
        $ionicNavBarDelegate.back();
    };

    $scope.logout = function () {
      Auth.logout();
    };

    $scope.$on('$firebaseSimpleLogin:login', function () {
      if ($location.path() === '/app/login') {
        $location.path('/app/profil');
      }
    });

}]);