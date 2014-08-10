'use strict';
angular

.module('Mypokerleague')

.controller('AuthCtrl',  ['$rootScope', '$scope', '$location', 'Auth', function ($rootScope,$scope, $location, Auth) {

    $scope.user ={};

    if (Auth.signedIn()) {
      $location.path('/app/events');
    }
 
    $scope.$on('$firebaseSimpleLogin:login', function () {
      $rootScope.user ={};
      $location.path('/app/profil');
    });
 
    $scope.login = function () {
      Auth.login($scope.user).then(function () {
      }, function (error) {
        $scope.error = error.toString();
      });
    };
 
    $scope.loginGoogle = function () {
      Auth.loginGoogle().then(function () {
      }, function (error) {
        $scope.error = error.toString();
      });
    };

    $scope.register = function () {
      Auth.register($scope.user).then(function (authUser) {
        console.log('register ok');
        $location.path('/');
      }, function (error) {
        console.log(error);
        $scope.error = error.toString();
      });
    };
  }]);