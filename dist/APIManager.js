class APIManager {
  constructor(){

  }
  getPlayers(teamName, renderCallback){
    $.get(`/teams/${teamName}`, function(data){
      renderCallback(data)
    })
  }
  getPlayerStats(playerObject, renderCallback, element){
    $.get(`/playerStats/${playerObject.lastname}/${playerObject.firstname}`, function(data){
      renderCallback(JSON.parse(data), element)
    })
  }

}