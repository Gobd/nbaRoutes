angular.module('nbaRoutes').service('teamService', function ($http, $q) {

  this.addNewGame = function(gameObj) {
    var url = 'https://api.parse.com/1/classes/' + gameObj.homeTeam;
      if (parseInt(gameObj.homeTeamScore) > parseInt(gameObj.opponentScore)) {
          gameObj.won = true;
      } else {
        gameObj.won = false;
      }
      return $http({
        method: "POST",
        url: url,
        data: gameObj,
        }).then(function(response) {
          console.log(response);
          return response;
      });
  };

  this.getTeamData = function(team){
    var url = 'https://api.parse.com/1/classes/' + team;
      var deferred = $q.defer();
       $http({
        method: "GET",
        url: url
        }).then(function(response) {
          var results = response.data.results;
          var wins = 0;
          var losses = 0;
            results.forEach(function(obj){
                  if (obj.won) {wins ++;} else {losses ++;}
            });
          results.wins = wins;
          results.losses = losses;
          deferred.resolve(results);
      });
      return deferred.promise;
  };

});
