class APIManager {
  constructor(){

  }
  getPlayers(teamName,renderCallback){
    $.get(`/teams/${teamName}`, function(data){
      const relevantData = data.map(player => {
        return {
          name: `${player.firstName} ${player.lastName}`,
          jersey: player.jersey,
          position: player.pos
        }
      })
      renderCallback(relevantData)
    })
  }

}