class Render {
  constructor(){
  }
  renderPlayers(data){
    $(`#all-players-container`).empty()
    const template = Handlebars.compile($(`#players-template`).html());
    const HTML = template({ players:data })
    $(`#all-players-container`).append(HTML)
    console.log(data)
  }
  renderPlayerStats(data, element){
    $(element).find('.player-stats').remove()
    const template = Handlebars.compile($(`#stats-template`).html());
    const HTML = template({ data })
    $(element).append(HTML)
    console.log(data)
  }
}


    