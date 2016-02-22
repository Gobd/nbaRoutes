angular.module('nbaRoutes', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/home/homeTmpl.html',
        controller: 'homeCtrl'
      });

});
