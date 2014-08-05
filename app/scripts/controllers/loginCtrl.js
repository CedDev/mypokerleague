'use strict';
angular

.module('Mypokerleague')

.controller('loginCtrl',  ['$rootScope', '$scope', '$stateParams','$firebase', '$firebaseSimpleLogin', function($rootScope, $scope, $stateParams,$firebase, $firebaseSimpleLogin) {

  $scope.user= {};

    $scope.login = function(query) {
        var ref = new Firebase('https://mypokerleague.firebaseio.com');
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
          } else {
            // user is logged out                       
          }
        });
      auth.login('password', {
        email: $scope.user.email,
        password: $scope.user.password,
        rememberMe: true
      });
    };

    $scope.loginGoogle = function () {
        var ref = new Firebase('https://mypokerleague.firebaseio.com');
        var auth = new FirebaseSimpleLogin(ref, function(error, user) {
          if (error) {
            // an error occurred while attempting login
            console.log(error);
          } else if (user) {
            // user authenticated with Firebase
          } else {
            // user is logged out                       
          }
        });
        auth.login('google', {
          rememberMe: true,
          scope: 'https://www.googleapis.com/auth/plus.login'
        });
    };

}]);
