tracker.config(function($routeProvider){

    $routeProvider

        .when('/',{
            templateUrl : 'src/login/login.html',
            controller : 'loginCtrl'
        } )

        .when('/login',{
            templateUrl : 'src/login/login.html',
            controller : 'loginCtrl'
        } )

        .when('/register',{
            templateUrl : 'src/register/register.html',
            controller : 'registerCtrl'
        } )

        .when('/tracker',{
            templateUrl : 'src/tracker/tracker.html',
            controller : 'trackerCtrl'
        } )

})
