// MODULE
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource']);

// CONTROLLER
angularApp.controller('mainController', ['$scope', '$timeout' ,function ($scope, $timeout) {
    $scope.name = 'Rahul';

    $timeout( function () {
        $scope.name = 'Shalu';
    },3000);
}]);



