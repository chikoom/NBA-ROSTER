class Render {
  constructor(){
  }
  renderPlayers(data){
    $(`#result`).empty()
    const template = Handlebars.compile($(`#players-template`).html());
    const HTML = template({ data })
    $(`#result`).append(HTML)
    console.log(data)
  }
  renderPlayerStats(data, element){
    $(element).find('.player-stats').remove()
    const template = Handlebars.compile($(`#stats-template`).html());
    const HTML = template({ data })
    $(element).append(HTML)
    console.log(data)
  }
  renderDreamTeam(data){
    console.log(data)
    const template = Handlebars.compile($(`#dream-template`).html());
    const HTML = template({ data })
    $(`#dream-team`).empty().append(HTML)
    
  }
}


    