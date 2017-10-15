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
    
    console.log(nameService);
    
    $scope.name = nameService.name;
    
    // We will add a eventlistner watch on name , once name updated we will update the nameService.name in angular context
    $scope.$watch('name',function(){
        nameService.name = $scope.name;
    })
    
    
    // This will grab whatever will come after # like http://127.0.0.1:55538/index.htm#/book/4 will give /book/4
    $log.info($location.path());
    
}]);


myApp.controller("secondController",['$scope','$timeout','$filter','$http','$location','$log','$routeParams','nameService',function($scope,$timeout,$filter,$http,$location,$log,$routeParams,nameService){
    
    $scope.name = nameService.name;
    
    // We will add a eventlistner watch on name , once name updated we will update the nameService.name in angular context
     $scope.$watch('name',function(){
        nameService.name = $scope.name;
    })
    
    $scope.num = $routeParams.num || 10 ;

    
    
}]);


