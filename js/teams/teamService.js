angular.module('nbaRoutes').service('teamService', function ($http) {

  this.addNewGame = function(gameObj) {
    var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
      if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
          gameObj.won = true;
      } else {
        gameObj.won = false;
      }
      return  $http({
        method: "POST",
        url: url,
        data: gameObj,
        }).then(function(response) {
          return response;
      });
  };

  this.getTeamData = function(team){
    var url = 'https://api.parse.com/1/classes/' + team;
      return  $http({
        method: "GET",
        url: url,
        data: gameObj,
        }).then(function(response) {
          var results = response.data.results;
          var wins = 0;
          var losses = 0;
          results.forEach(function(obj){
                  if (obj.won) {won ++;} else {losses ++;}
          });
          results.win = wins;
          results.losses = losses;
          return results;
      });
  };

});
