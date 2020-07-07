class APIManager {
  constructor(){

  }
  getPlayers(teamName, renderCallback){
    $.get(`/teams/${teamName}`, function(data){
      renderCallback(data)
    })
  }

}