// MODULE
var angularApp = angular.module('angularApp', ['ngMessages', 'ngResource']);

// CONTROLLER
angularApp.controller('mainController', ['$scope', function ($scope) {
    $scope.yourName = '';
}]);

var serachPeople =  function (firstName, lastName) {
    return 'Rahul Choudhary';
}
console.log(angular.injector().annotate(serachPeople));



