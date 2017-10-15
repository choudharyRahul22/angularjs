var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$timeout','$filter',function($scope,$timeout,$filter){
    
    // All native browser implement this object.
    var request = new XMLHttpRequest();
    
    // Develope by Microsoft for Outlook Web Request
    
    request.onreadystatechange = function(){
        
        // readyState : request is ready to go out to take data from internet
        // status : status 200 shows request is successful
        if(request.readyState == 4 && request.status == 200){
            
            // responseText : data that came as response from internet
            $scope.data = JSON.parse(request.responseText);
        }
        
        
    }
    
    request.open('GET', 'URL', true);
    
    // it send the request when finishes it fire the onreadystatechange
    request.send();
    
    
    
}]);