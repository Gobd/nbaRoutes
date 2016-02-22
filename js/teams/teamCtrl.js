angular.module('nbaRoutes').controller('teamCtrl', function ($scope, $stateParams, teamService, teamData, $http) {

  // the resolved data from the router needs to be injected into the controller

  $scope.teamData = teamData;
  $scope.newGame = {};
  $scope.showNewGameForm = false;
  $scope.toggleNewGameForm = function() {
      $scope.showNewGameForm = !$scope.showNewGameForm;
    };

  if ($stateParams.team === 'utahjazz') {
    $scope.homeTeam = 'Utah Jazz';
    $scope.logoPath = 'images/jazz-logo.png';
  } else if ($stateParams.team === 'losangeleslakers') {
    $scope.homeTeam = 'Los Angeles Lakers';
    $scope.logoPath = 'images/lakers-logo.png';
  } else if ($stateParams.team === 'miamiheat') {
    $scope.homeTeam = 'Miami Heat';
    $scope.logoPath = 'images/heat-logo.png';
  }

  $scope.submitGame = function(){
    $scope.newGame.homeTeam = $scope.homeTeam.split(' ').join('').toLowerCase();
    console.log($scope.newGame);
    teamService.addNewGame($scope.newGame).then(function(){
      teamService.getTeamData($scope.newGame.homeTeam).then(function(response){
        $scope.teamData = response;
        $scope.newGame = {};
        $scope.showNewGameForm = false;
      });
    });
  };

  $scope.delete = function(id) {
    $scope.teamData.forEach(function(obj){
      for (var key in obj) {
        var url = 'https://api.parse.com/1/classes/'+ $scope.homeTeam.split(' ').join('').toLowerCase() + '/' + obj.objectId;
          return $http({
            method: "DELETE",
            url: url,
            }).then(function(response) {
              console.log(response);
              return response;
          });
      }
    });

  };

});
