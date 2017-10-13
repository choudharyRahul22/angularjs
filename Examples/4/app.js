var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$timeout','$filter',function($scope,$timeout,$filter){
    
   $scope.handle = '';
    
   $scope.$watch('handle',function(newVal, oldVal){
       console.log('Changed!');
       console.log('Old value : ' + oldVal);
       console.log('New value : ' + newVal);
   })
    
    setTimeout(function(){
        $scope.$apply(function(){
            $scope.handle = 'Shalu Choudhary';
        console.log('Updated!');
        })
    },3000);
    
    $timeout(function(){
        $scope.handle = 'Rahul Choudhary';
    },6000)
    
}]);