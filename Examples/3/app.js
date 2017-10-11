var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$timeout','$filter',function($scope,$timeout,$filter){
    
   $scope.handle = '';
   
    
   $scope.handleInLowerCase = function(){
       return $filter('lowercase')($scope.handle);
   };
    
   $scope.handleInUpperCase = function(){
       return $filter('uppercase')($scope.handle);
   };
    
}]);