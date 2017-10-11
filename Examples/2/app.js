var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$timeout',function($scope,$timeout){
    
   $scope.name = 'Rahul Choudhary';
    
   $timeout(function(){
       
       $scope.name = 'Shalu Choudhary';
       
   },3000);
    
}]);