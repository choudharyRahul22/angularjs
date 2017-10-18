// Module
var weatherApp = angular.module('weatherApp',['ngRoute','ngResource']);



// Directive
weatherApp.directive('forecastResult',function(){
    
        return {
            
            restrict : 'AECM',
            templateUrl:'directive/forecastDirective.html',
            replace: true,
            scope: {
                        
                        forecastData:'='
                
                   }
        }
    
});


// Service
weatherApp.service('cityForecast',function(){
    
     this.cityNameService = 'Noida';
     
    
});

// Route
weatherApp.config(function($routeProvider){
    
    $routeProvider
        
        .when('/',{
        
            templateUrl:'pages/home.html',
            controller:'homeController'
        
        })
    
    
    
        .when('/forecast',{
        
            templateUrl:'pages/forecast.html',
            controller:'forecastController'
        
        })
    
    
        .when('/forecast/:numOfDays',{
        
            templateUrl:'pages/forecast.html',
            controller:'forecastController'
        
        })
    
});


// Controller
weatherApp.controller('homeController',['$scope','cityForecast','$location',function($scope,cityForecast,$location){
    
    $scope.cityName = cityForecast.cityNameService;
    
    $scope.$watch('cityName',function(){
        cityForecast.cityNameService = $scope.cityName;
    })
    
    $scope.submit = function(){
        $location.path('/forecast');
    }
    
    
    
}])

weatherApp.controller('forecastController',['$scope','cityForecast','$routeParams',function($scope,cityForecast,$routeParams){
    
    $scope.cityName = cityForecast.cityNameService;
    
    $scope.numOfDays = $routeParams.numOfDays || 2;
    
    $scope.$watch('cityName',function(){
        cityForecast.cityNameService = $scope.cityName;
    })
    
    
    $scope.forecastResultList = [
        {
            city: 'Noida',
            date: new Date(),
            temp: '34F'
         
        },
        
        {
            city: 'Noida',
            date: new Date(),
            temp: '35F'
         
        },
        
        {
            city: 'Noida',
            date: new Date(),
            temp: '36F'
         
        },
        
        {
            city: 'Noida',
            date: new Date(),
            temp: '37F'
         
        },
        
        {
            city: 'Bareilly',
            date: new Date(),
            temp: '38F'
         
        },
        
        {
            city: 'Bareilly',
            date: new Date(),
            temp: '39F'
         
        },
        
        {
            city: 'Bareilly',
            date: new Date(),
            temp: '40F'
         
        },
        
        {
            city: 'Bareilly',
            date: new Date(),
            temp: '41F'
         
        },
        
        
        
    ]
    
}])






