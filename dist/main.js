const apiManager = new APIManager()
const renderer = new Render()

$('#btn-search').on('click', function(){
  const searchQuery = $('#inp-team').val().toLowerCase()
  apiManager.getPlayers(searchQuery, renderer.renderPlayers)
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



