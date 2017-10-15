var myApp = angular.module("angularApp",['ngRoute']);

myApp.config(function($routeProvider){
    
    $routeProvider
                
                 // takes url and object
                 .when('/',{
                        
                        // templateUrl : actual physical location of html page and COntroller
                           templateUrl : 'pages/main.html',
                           controller : 'mainController'
                        } )
    
    
                  .when('/second',{
        
                           templateUrl : 'pages/second.html',
                           controller : 'secondController'
        
                        } )
            
                 .when('/second/:num',{
        
                           templateUrl : 'pages/second.html',
                           controller : 'secondController'
        
                        } )
    
})

myApp.controller("mainController",['$scope','$timeout','$filter','$http','$location','$log',function($scope,$timeout,$filter,$http,$location,$log){
    
    $scope.name = "Main";
    
    // This will grab whatever will come after # like http://127.0.0.1:55538/index.htm#/book/4 will give /book/4
    $log.info($location.path());
    
}]);


myApp.controller("secondController",['$scope','$timeout','$filter','$http','$location','$log','$routeParams',function($scope,$timeout,$filter,$http,$location,$log,$routeParams){
    
    $scope.name = "Second";
    
    $scope.num = $routeParams.num || 10 ;

    
    
}]);


