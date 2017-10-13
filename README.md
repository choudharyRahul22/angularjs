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
<h1>Rules</h1>
                    <ul>
                        <li ng-repeat="rule in rules" class="alert alert-success">{{rule.rulename}}</li>
                    </ul> 





