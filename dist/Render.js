class Render {
  constructor(){
  }
  createMessage(text){
    $('#message').empty().append(text)
  }
  renderSaveTeam = (teamNames, message) => {
    this.createMessage(message || '')
    $('#slct-dream').empty().append(`<option value="0">Select Team</option>`)
    teamNames.flatMap(x => {
      let teamName = Object.keys(x)
      $('#slct-dream').append($(`<option value="${teamName}">${teamName}</option>`))
    })
  }
  renderPlayers = data => {
    const msgText = (data) ? '' : `Could not found team!`
    this.createMessage(msgText) 
    if (data) {
      const template = Handlebars.compile($(`#players-template`).html());
      const HTML = template({ data })
      $(`#result`).empty().append(HTML)
    }
  }
  renderPlayerStats = (data, element) => {
    $(element).find('.player-stats').remove()
    const template = Handlebars.compile($(`#stats-template`).html());
    const HTML = template({ data })
    $(element).append(HTML)
  }
  renderDreamTeam = data => {
    if(data === 'double') this.createMessage('Player Already In DreamTeam')
    else if(data === 'full') this.createMessage('DreamTeam Full')
    else {
      this.createMessage('')
      const template = Handlebars.compile($(`#dream-template`).html());
      const HTML = template({ data })
      $(`#dream-team`).empty().append(HTML)
    }
  }
  clearDreamTeam = () => {
    $(`#dream-team`).empty()
  }
}


    