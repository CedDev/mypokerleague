'use strict';
angular

.module('Mypokerleague')

.controller('profilCtrl',  ['$rootScope', '$scope', '$location', 'Auth', '$firebase','$ionicSlideBoxDelegate', function ($rootScope, $scope, $location, Auth, $firebase,$ionicSlideBoxDelegate) {
      
      $scope.user = Auth.getUser();
      $scope.uid = ($scope.user) ? $scope.user.uid:'undefined';

      var playerRef = new Firebase("https://mypokerleague.firebaseio.com/users/" +$scope.uid);
      $scope.player = $firebase(playerRef);

      playerRef.update({ lastConn : GetCurrentDate()}, function(err) {
      });

      function firstPartOfEmail(email) {
        return ucfirst(email.substr(0, email.indexOf('@'))||'');
      }

      function ucfirst (str) {
        // credits: http://kevin.vanzonneveld.net
        str += '';
        var f = str.charAt(0).toUpperCase();
        return f + str.substr(1);
      }

      function GetCurrentDate() {
          // Today date time which will used to set as default date.
          var todayDate = new Date();
          todayDate = todayDate.getFullYear() + "-" +
                         ("0" + (todayDate.getMonth() + 1)).slice(-2) + "-" +
                         ("0" + todayDate.getDate()).slice(-2) + " " + ("0" + todayDate.getHours()).slice(-2) + ":" +
                         ("0" + todayDate.getMinutes()).slice(-2);
   
          return todayDate;
      }

      $scope.slideChanged = function(slide) {
        $scope.data.currentSlide = $ionicSlideBoxDelegate.currentIndex();
      };

    $scope.nextSlide = function() {
        $ionicSlideBoxDelegate.next();
      }

    $scope.prevSlide = function() {
        $ionicSlideBoxDelegate.previous();
      }

      $scope.saveUser = function () {

        //mise à jour de la date de création si inexisante
        if ($scope.player.registerDate === undefined) {
          playerRef.update({ registerDate : GetCurrentDate()}, function(err) {
          });
        }

        playerRef.update(
          {
            pseudo: ''+ $scope.player.pseudo,
            realName:  ''+ $scope.player.realName, 
            email: $scope.user.email,
            mobile:  ''+ $scope.player.mobile, 
            address: { rue: ''+ $scope.player.address.rue, 
                       cp: ''+ $scope.player.address.cp,
                       ville:''+ $scope.player.address.ville,
                       reception:+ $scope.player.address.reception
                      }
          }, function(err) {});   
      };
  }]);