var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$timeout','$filter','$http',function($scope,$timeout,$filter,$http){
    
    // get
    $http.get('URL')
         .success(function(result){
         
            console.log(result);
        
    })   .error(function(data,status
                          
            console.log(data);
        
    })
    
    
    // post
    $http.post('URL',{ 'key' : value })
         .success(function(result){
         
            console.log(result);
        
    })   .error(function(data,status
                          
            console.log(data);
        
    })
    
    
}]);