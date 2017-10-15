Learn And Understand Angularjs
------------------------------

Problem that angularjs trying to solve:
1. Model , View , Whatever.... angularjs has something that will bind the js objects,  
   variables to the HTML (DOM) automatically.

Modules Apps Controllers:
-------------------------
We have a global angular object "angular".
We can create a new global variable using "angular":
var myApp = angular.module("app-name",[dependencies]);

<html lang="en-us" ng-app="angularApp">
we angular sees ng-app 'custom directive' it look for angularApp module.

similarly : <div ng-controller="mainController"> will look for custom attribute ng-controller on angularApp module.

builtin services we have : $scope $log $filters ....

Minification:
-------------
We define the services as a string in a array.
Note: order should be same in function param also.

myApp.controller("mainController",['$scope','$log','$filter',function($scope,$log,$filter){
    
    console.log($scope);
    
    console.log($log);
    
    console.log($filter);

    
}]);

Scope and Interpolation:
------------------------
Interpolation : creating a string by combining strings and placeholders like 
var name = 'Rahul Choudhary';
console.log('Hello ' + name); 

html:
<div ng-controller="mainController">           
      <h1>Hello {{ name + ". How are you ?"}}</h1>
</div>

app.js:
myApp.controller("mainController",['$scope','$timeout',function($scope,$timeout){
    
   $scope.name = 'Rahul Choudhary';
    
   $timeout(function(){
       
       $scope.name = 'Shalu Choudhary';
       
   },3000);
    
}]);

Directives and Two Way Databinding:
-----------------------------------
Directives : An instruction to angularjs to manipulate a piece of DOM.
Sits in html starts with ng-**.

Example : ng-model - 2 way databinding binds html element to the js variable.

html:
<div>
                    <label>Whats your twitter handle?</label>
                    <input type="text" ng-model="handle" />
                    <hr>
                    twitter.com/{{handle}}
                    <hr>
                    <h1>Twitter handle in Lower Case</h1>
                    twitter.com/{{handleInLowerCase()}}
                    <hr>
                    <h1>Twitter handle in Upper Case</h1>
                    twitter.com/{{handleInUpperCase()}}
</div>
                

app.js:
myApp.controller("mainController",['$scope','$timeout','$filter',function($scope,$timeout,$filter){
    
   $scope.handle = '';
   
    
   $scope.handleInLowerCase = function(){
       return $filter('lowercase')($scope.handle);
   };
    
   $scope.handleInUpperCase = function(){
       return $filter('uppercase')($scope.handle);
   };
    
}]);

Watchers and Digest Loop:
-------------------------
Angularjs is adding eventlisten rs for us and extends the javascript event loop to listen to the events.

Javascript Event Loop + Angularjs Context(Watchers and Digest cycle)

Watchers has old and new value.

Every time we put a variable in $scope.name and associate it to html, angularjs will add this variable to the watcher list and watch this variable old value and new value.

watching and checking for changes is done inside digest loop.
digest loop will loop over watch list and check if anything changed (from old value and new value) and if any thing changed than digest cycle will updated same in all angular context where that variable is used.

Once a event occur like keypress, click, mouseover, change - Javascript Event Loop will get the Event in the Queue and angularjs has already set up the event listners so once any event occur the watcher will watch the old value with the new value and digest cycle will update same variable inside angular context.

html:
  <div>
                    <label>Whats your twitter handle?</label>
                    <input type="text" ng-model="handle" />
                    <hr>
                    twitter.com/{{handle}}
 </div>

app.js
myApp.controller("mainController",['$scope','$timeout','$filter',function($scope,$timeout,$filter){
    
   $scope.handle = '';
   // manually adding watcher to varible handle
   $scope.$watch('handle',function(newVal, oldVal){
       console.log('Changed!');
       console.log('Old value : ' + oldVal);
       console.log('New value : ' + newVal);
   })
    
}]);

whenever handle vaiable changes it will call the function (pass as param inside watch)

$scope.$apply(function(){}) will put your code inside the angular context.

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

Model ----> Watchers and Digest Cycle -----> View

Common Directives:
------------------
We can have more than one directive on a html element.

ng-if : removes the html in the DOM

ng-hide : hide the html in the DOM, it adds a css class ng-hide
<div class="alert ng-hide" ng-show="handle.length !== charaters">
                    Must be 5 Charaters! Using ng-show
</div>

ng-hide simply adds : css ........display : none !important;......

ng-class : ng-class="{'alert-warning' : handle.length < charaters}
ng-class takes js object key is css class that we want to apply and value is expression.

ng-repeat : loop over a array
app.js:
$scope.rules = [
       
       {'rulename' : 'Must be 5 charater'},
       {'rulename' : 'Must not be used elsewhere'},
       {'rulename' : 'Must be cool'}
       
   ]
html:
<h1>Rules</h1>
                    <ul>
                        <li ng-repeat="rule in rules" class="alert alert-success">{{rule.rulename}}</li>
                    </ul> 


ng-click: ng-click="btnClicked()"
ng-clock: hide element in DOM until js work on it.

Angular Doc : https://docs.angularjs.org/api/ng/directive

XMLHTTPRequest Object:
----------------------
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

External Data and $http:
------------------------
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


Multiple Controller and Multiple View:
--------------------------------------
html:
<div ng-controller="mainController">
                
                <h1>{{name}}</h1>
                
            </div>
            
            <div ng-controller="secondController">
                
                <h1>{{name}}</h1>
                
            </div>
</div>

app.js
myApp.controller("mainController",['$scope','$timeout','$filter','$http',function($scope,$timeout,$filter,$http){
    
    $scope.name = "Main";
    
}]);


myApp.controller("secondController",['$scope','$timeout','$filter','$http',function($scope,$timeout,$filter,$http){
    
    $scope.name = "Second";
    
}]);

Note : $scope is prototype in nature and rest of services are singleton in nature.

Routing Templates and Controllers:
----------------------------------
html:
<div class="container">
            
            <div ng-view></div>

</div>

app.js
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
    
})

myApp.controller("mainController",['$scope','$timeout','$filter','$http','$location','$log',function($scope,$timeout,$filter,$http,$location,$log){
    
    $scope.name = "Main";
    
    // This will grab whatever will come after # like http://127.0.0.1:55538/index.htm#/book/4 will give /book/4
    $log.info($location.path());
    
}]);


myApp.controller("secondController",['$scope','$timeout','$filter','$http','$location','$log',function($scope,$timeout,$filter,$http,$location,$log){
    
    $scope.name = "Second";
    
    
    
}]);

Custom Services:
----------------
All $scope are child scope that inherit from $root scope and $scope is exception while other services are singleton in nature, $scope is prototype in nature.

Whenever we move from one to other page a new request is made html is loaded. New memory is created for js and all previous data will gone.

Inside Single Page Application if we move from one page to other we still get the same memory space.We can share the js data across the pages.

Services are used when we need to share data across pages (SPA).

Factories concept are same as services.

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


Custom Directives:
------------------
Html when loaded have the directive <serach-result></serach-result>
when angularjs see this drirective it will attch the template and we will see below in html.

<search-result>
	
	<a href="#" class="list-group-item">
	<h4 class="list-group-item-heading">Choudhary, Rahul</h4>
	<p>VVIP Addresses Rajnagar Extension, 201017</p></a>

</search-result>

// Custom Directive : searchResult will be normalize in html as <search-result>

html:
<h3>Search Results</h3>
<div class="list-group">
  
    <search-result></search-result>
    <div search-result></div>
    <div class="search-result"></div>
    <!-- directive: search-result -->
    
</div>

app.js:
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
        
        
        
    }
    
})

Scope:
------















