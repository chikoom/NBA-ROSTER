class APIManager {
  constructor(){
    this.players = []
    this.roster = []
    this.dream = []
  }
  getPlayers(teamName, renderCallback){
    $.get(`/teams/${teamName}`, (data) => {
      this.players = data.playersData
      renderCallback(data)
    }).fail( function() {
      renderCallback(0)
    })
  }
  getPlayerStats(playerObject, renderCallback, element){
    $.get(`/playerStats/${playerObject.lastname}/${playerObject.firstname}`, function(data){
      renderCallback(JSON.parse(data), element)
    })
  }
  getDreamPlayers(renderCallback){
    $.get(`/dreamTeam`, function(data){ 
      renderCallback(data)
    })
  }
  addDreamPlayers(playerID, renderCallback){
    const playerToAdd = this.players.find(player => player.id === playerID)
    $.ajax({
      type: "POST",
      url: `/roster`,
      data: playerToAdd,
      success: (data) => {
        this.dream = data
        renderCallback(data)
      }
    });
  }
  removeDreamPlayers(playerID, renderCallback){
    $.ajax({
      type: "DELETE",
      url: `/roster`,
      data: {playerID},
      success: (data) => {
        this.dream = data
        renderCallback(data)
      },
      dataType: 'JSON'
    });
  }
  getDream(){
    return this.dream
  }
}
