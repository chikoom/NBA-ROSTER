class APIManager {
  constructor(){
    this.players = []
    this.roster = []
  }
  getPlayers(teamName, renderCallback){
    $.get(`/teams/${teamName}`, (data) => {
      
      this.players = data.playersData
      console.log(this.players)
      renderCallback(data)
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
    console.log(this.players)
    console.log(playerToAdd)
    $.ajax({
      type: "POST",
      url: `/roster`,
      data: playerToAdd,
      success: function(data){
        renderCallback(data)
      },
      dataType: 'JSON'
    });
  }
  removeDreamPlayers(playerID, renderCallback){
    $.ajax({
      type: "DELETE",
      url: `/roster`,
      data: {playerID},
      success: function(data){
        renderCallback(data)
      },
      dataType: 'JSON'
    });
  }
}
