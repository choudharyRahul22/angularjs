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
    
   $scope.$watch('handle',function(newVal, oldVal){
       console.log('Changed!');
       console.log('Old value : ' + oldVal);
       console.log('New value : ' + newVal);
   })
    
}]);


$scope.$apply(function(){}) will put your code inside the angular context.

Model ----> Watchers and Digest Cycle -----> View



