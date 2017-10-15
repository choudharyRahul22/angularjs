var myApp = angular.module("angularApp",['ngRoute']);

// Routing Code
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

// Custom Service : Singleton in nature
myApp.service('nameService',function(){
    
    var self = this;
    
    self.name = 'Rahul';
    
    self.nameLength = function(){
        return self.name.length;
    }
    
})


// Controller
myApp.controller("mainController",['$scope','$timeout','$filter','$http','$location','$log','nameService',function($scope,$timeout,$filter,$http,$location,$log,nameService){
    
   
}]);


myApp.controller("secondController",['$scope','$timeout','$filter','$http','$location','$log','$routeParams','nameService',function($scope,$timeout,$filter,$http,$location,$log,$routeParams,nameService){
    
   
    
}]);


