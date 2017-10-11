var myApp = angular.module("angularApp",[]);

myApp.controller("mainController",['$scope','$log','$filter',function($scope,$log,$filter){
    
    $scope.name = 'Rahul Choudhary';
    console.log($scope);
    
    console.log($log);
    
    //$log.error("ERROR");
    $log.info("This is some INFO");
    $log.debug("DEBUG");
    $log.warn("WARN");
    $log.log("LOG");
    $log.error("ERROR");
    
    
    console.log($filter);

    var formattedName = $filter('uppercase')($scope.name);
    console.log($scope.name);
    console.log(formattedName);
}]);