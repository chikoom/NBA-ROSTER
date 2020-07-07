const apiManager = new APIManager()
const renderer = new Render()

$('#btn-search').on('click', function(){

  const searchQuery = $('#inp-team').val()
  apiManager.getPlayers(searchQuery, renderer.renderPlayers)

})



