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

// Custom Directive : searchResult will be normalize in html as <search-result>
myApp.directive('searchResult', function(){
    
    return{
        
        // A: Attribute E: Element C:Class M: Comment , What we specify in restrict will show in DOM , rest will be ignored.
        // restrict : 'EA' is default property
        restrict : 'AECM',
        
        // html that will be shown
        templateUrl: 'directive/searchResult.html',
        
        // this will remove the directive (<serach-result>) from the DOM if true and will conatin only template in DOM
        // if false template will come under <search-result> element. 
        replace : true,
        
        // This is the model for the directive view
        // Now the default property ie: child can access the parent scope will be restricted
        scope: {
            
            // @ for text
            //personNameText : '@personName' this is same as below, for below it will think that the personName here is same what we used as attribute on directive.
            
            //personNameText : '@personName', this and below are same
            
            // = for object its 2 way databinding if we change this object inside directive it will get change for parent scope
            personObject : '=',
            
            
            // & for function
            personObjectFunction : '&',
                
            
        },
        
        // compile runs once for directive which is repeated in loop for 3 times
        compile: function(elem,attr){
            console.log('Compiling....');
            // If you uncomment below than it will remove the class from element while compiling
            //elem.removeAttr('class');
            console.log(elem.html());
            console.log(attr);
            
            return{
                // prelink runs 3 times as loop runs 3 times
                // order for param should be same
                pre:function(scope,elem,attr){
                    console.log('Pre-Linking....');
                    console.log(scope);
                    console.log(elem);
                    console.log(attr);
                },
                // postlink runs 3 times as loop runs 3 times
                // order for param should be same
                post:function(scope,elem,attr){
                    console.log('Post-Linking....');
                    console.log(scope);
                    
                    /*if(scope.personObject.name === 'Choudhary, Shalu'){
                       elem.removeAttr('class'); 
                    }*/
                    
                    console.log(elem);
                    console.log(attr);
                },
                
                
            }
        }
        
        
        
    }
    
})


// Controller
myApp.controller("mainController",['$scope','$timeout','$filter','$http','$location','$log','nameService',function($scope,$timeout,$filter,$http,$location,$log,nameService){
   
    $scope.persons = [{
        
        name: 'Choudhary, Rahul',
        addresses : 'VVIP Addresses Rajnagar Extension,',
        zip: '201301'
    },
    
    {
        
        name: 'Choudhary, Shalu',
        addresses : 'VVIP-2 Addresses Rajnagar Extension,',
        zip: '201302'
    },
                      
    {
        
        name: 'Choudhary, Ravi',
        addresses : 'VVIP-3 Addresses Rajnagar Extension,',
        zip: '201302'
    }
                     
                     
    ]
    
    $scope.personObjectFunction = function(person){
        return person.addresses + ' ' + person.zip;
    }
   
}]);


myApp.controller("secondController",['$scope','$timeout','$filter','$http','$location','$log','$routeParams','nameService',function($scope,$timeout,$filter,$http,$location,$log,$routeParams,nameService){
    
   
    
}]);


