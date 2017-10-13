var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$timeout','$filter',function($scope,$timeout,$filter){
    
   $scope.handle = '';
    
   $scope.charaters = 5;
    
   $scope.rules = [
       
       {'rulename' : 'Must be 5 charater'},
       {'rulename' : 'Must not be used elsewhere'},
       {'rulename' : 'Must be cool'}
       
   ]
    
}]);