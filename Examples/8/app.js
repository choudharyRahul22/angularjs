var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$timeout','$filter','$http',function($scope,$timeout,$filter,$http){
    
    $scope.name = "Main";
    
}]);


myApp.controller("secondController",['$scope','$timeout','$filter','$http',function($scope,$timeout,$filter,$http){
    
    $scope.name = "Second";
    
}]);