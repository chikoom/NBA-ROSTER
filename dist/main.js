const apiManager = new APIManager()
const renderer = new Render()

$('#btn-search').on('click', function(){
  const searchQuery = $('#inp-team').val().toLowerCase()
  apiManager.getPlayers(searchQuery, renderer.renderPlayers)
})

$('#btn-dream').on('click', function(){
  apiManager.getDreamPlayers(renderer.renderDreamTeam)
})


$('body').on('click','.btn-removeDream', function(event){
  event.stopPropagation()
  const playerId = $(this).closest('.player-container').data().id
  apiManager.removeDreamPlayers(playerId, renderer.renderDreamTeam)
})

$('body').on('click','.btn-addDream', function(event){
  event.stopPropagation()
  const playerId = $(this).closest('.player-container').data().id
  apiManager.addDreamPlayers(playerId, renderer.renderDreamTeam)
})

$('body').on('click','.player-container', function(){
  apiManager.getPlayerStats({
    firstname:$(this).data().firstname,
    lastname:$(this).data().lastname,
    }, renderer.renderPlayerStats, $(this))
})

$('body').on('click','.player-stats', function(event){
  $(this).remove()
  event.stopPropagation()
})



