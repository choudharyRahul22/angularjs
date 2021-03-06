Learn And Understand Angularjs
------------------------------
Problem that angularjs trying to solve:
1. Model , View , Whatever.... angularjs has something that will bind the js objects, variables to the HTML (DOM) and vise versa automatically.

Modules & Controllers:
----------------------
We have a global angular object "angular".
We can create a new global variable using "angular":
var angularApp = angular.module("angularApp",[dependencies]);

<html lang="en-us" ng-app="angularApp">
when angular sees ng-app 'custom directive' it look for angularApp module.

similarly : <div ng-controller="mainController"> will look for custom attribute ng-controller on angularApp module.

builtin services we have : $scope $log $filters ....

Minification:
-------------
myApp.controller("mainController",['$scope','$log','$filter',function($scope,$log,$filter){
    
    console.log($scope);
    
    console.log($log);
    
    console.log($filter);

    
}]);

We define the services as a string in a array.
Note: order should be same in function param also.

How $scope Works?
-----------------
angularApp.controller('mainController', ['$scope', function ($scope) {
    $scope.name = '';
}]);
Behind The Scen: angularApp.controller.toString() will give the string representation of function. We will parse the function and get all parameters pass to this function. Now if parameter matches like '$scope' we will give the $scope object to this parameter.

We can also check this :
var serachPeople =  function (firstName, lastName) {
    return 'Rahul Choudhary';
}
console.log(angular.injector().annotate(serachPeople));
console out: ["firstName", "lastName"]

Scope and Interpolation:
------------------------
Interpolation : creating a string by combining strings and placeholders like 
var name = 'Rahul Choudhary';
console.log('Hello ' + name); 

Scope: scope of variable will be inside the controller.

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
used in html to change dom.

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
In javascript when ever any event happens on DOM then that event will go inside javascript event queue as js is single threaded so first the current execution context (current running code) of js will be finished after that event from event loop will be performed.

Angularjs is adding eventlistenrs for us and extends the javascript event loop to listen these events.

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
ng-class takes js object : key is css class that we want to apply and value is expression.

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
                        
                        // templateUrl : actual physical location of html page and Controller
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

Same as component in Angular2.

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

Scope '@'' text:
----------------
html:
<!-- controller for this page is mainController which has person object
     so person object by default will be availabe to : <search-result> directive 

    So here child <search-result> scope can access parent scope (mainController) , which can be dangerous like 
    if child changes anything that will affect the parent also.

    We added scope to directive which will isolate the direvtive to access the parent scope
    To access the parent scope we added custom attribute to directive which recive its value from parent scope
    Than we use this custom attribute inside scope, which acts as a model for direvtive and we access it inside template
    -->
    <search-result person-name="{{person.name}}" person-addresses="{{person.addresses}}"></search-result>

app.js:
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
            personName : '@',
            
            personAddresses : '@'
            
            
            
        }
        
        
        
    }
    
})

directive:
<a href="#" class="list-group-item">
    <!-- person object is by deafult avialabe to this custom directive -->
    <h4 class="list-group-item-heading">{{personName}}</h4>
    <p>{{personAddresses}}</p>
</a>

scope '='' object:
------------------
// Custom Directive : searchResult will be normalize in html as <search-result>
myApp.directive('searchResult', function(){
    
    return{
        
        // A: Attribute E: Element C:Class M: Comment , What we specify in restrict will show in DOM , rest will be ignored.
        // restrict : 'EA' is default property
        restrict : 'AECM',
        
        // html that will be shown
        templateUrl: 'directive/searchResult.html',
        
        // this will remove the directive (<serach-result>) from the DOM if true and will conatin only template in DOM
        // if false  template will come under <search-result> element. 
        replace : true,
        
        // This is the model for the directive view
        // Now the default property ie: child can access the parent scope will be restricted
        scope: {
            
            // @ for text
            //personNameText : '@personName' this is same as below, for below it will think that the personName here is same what we used as attribute on directive.
            
            //personNameText : '@personName', this and below are same
            
            // = for object its 2 way databinding if we change this object inside directive it will get change for parent scope
            personObject : '='
            
            
            
            
            
        }
        
        
        
    }
    
})

scope '&'' function:
--------------------
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
            // we need to pass the parameter of function as a object map
            // like functionName({aperson: personObject})
            personObjectFunction : '&'
            
            
            
        }
        
        
        
    }
    
})

Compile and Link:
-----------------
When building code, the compiler converts code to lower level language,
then the linker genrates the file the computer will actually interact with.

Angularjs compile and link theroritically same as above but not excatly.

compile prelink and postlink : 
example :

Flow for the compile prelink and postlink

// compile and prelink (down the chain for custom directive)-1
//postlink (up the chain for custom directive)-6
<search-result>
	//compile and prelink-2
	//postlink (up the chain for custom directive)-5
	<search-result>
		//compile and prelink-3
		//postlink (up the chain for custom directive)-4
		<search-result></search-result>
	</search-result>
</search-result>


compile should be initialize : while initialize the directive
post and prelink should be onbind : while bind the directive

app.js:
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

Transclusion:
-------------
Include one document inside another.

Note:
Put js inside body at last so that html will load first than js.

Note:
Name : <input type="text" ng-model="name"><br>
       <h3>{{name}}</h3>

Here the name property is living in root scope of angularjs.

Note:
History in angularjs maintain by history.js (navigation html pages)

Note:
$routeProvider : default case
.otherwise({redirectTo:'/'})

Note:
Create Rest API using NodeJs

server.js:
---------
var express = require('express'),
  app=express();


app.get('/customers',function (req,res) {
    res.json(customers);
})

var port = process.env.PORT || 5000;
app.listen(port, function() {
    console.log("Listening on " + port);
});

var customers = [
    {joinDate:'11-22-2017',name:'Rahul',salary:'55000',city:'Bareilly'},
    {joinDate:'10-22-2017',name:'Shalu',salary:'54000',city:'Noida'},
    {joinDate:'18-22-2017',name:'Shubham',salary:'57000',city:'Delhi'},
    {joinDate:'19-22-2017',name:'Kuldeep',salary:'51000',city:'Ghaziabad'}


]

Go to Dir where server.js file is kept : your project dir
Run : npm install express
Run : node server.js
check on port that you define like : localhost:5000/customers


Webstrom:
---------
npm install -g bower
bower install angular --save
bower install bootstrap
index.html browser icon will come run it


npm install angular --save
npm install bootstrap
index.html browser icon will come run it






