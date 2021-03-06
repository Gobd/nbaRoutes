angular.module('nbaRoutes', ['ui.router'])

.config(function ($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('httpRequestInterceptor');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'js/home/homeTmpl.html',
        controller: 'homeCtrl',
        views: {
          utahjazz: {
            templateUrl: 'js/teams/teamTmpl.html',
            controller: 'teamCtrl',
            resolve: {teamData:
              function(teamService){
                return teamService.getTeamData('utahjazz');
              }
            }
          },
          losangeleslakers: {
            templateUrl: 'js/teams/teamTmpl.html',
            controller: 'teamCtrl',
            resolve: {teamData:
              function(teamService){
                return teamService.getTeamData('losangeleslakers');
              }
            }
          },
          miamiheat: {
            templateUrl: 'js/teams/teamTmpl.html',
            controller: 'teamCtrl',
            resolve: {teamData:
              function(teamService){
                return teamService.getTeamData('miamiheat');
              }
            }
          }
        }
      })
      .state('teams', {
        url: '/teams/:team',
        templateUrl: 'js/teams/teamTmpl.html',
        controller: 'teamCtrl',
        resolve: {teamData:
          function(teamService, $stateParams){
            return teamService.getTeamData($stateParams.team);
          }
        }
      });

    $urlRouterProvider.otherwise('/');

});
