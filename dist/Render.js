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
}


    