var anguapp = angular.module('angularApp',['ngRoute','ui.bootstrap']);
anguapp.config(function($routeProvider){
  $routeProvider
    .when('/gamepage',{
      templateUrl : 'partials/game.html',
      controller : 'gameCtrl'
    })
    .when('/dashboard',{
      templateUrl : 'partials/dashboard.html',
      controller : 'dashboardCtrl'
    })
 });
