const express = require('express')
const urllib = require('urllib');


const app = express()

const APIURL = 'http://data.nba.net/10s/prod/v1/2018/players.json'
const teamToIDs = {
  "lakers": "1610612747",
  "warriors": "1610612744",
  "heat": "1610612748",
  "suns": "1610612756"
}

app.get('/teams/:teamName', (request, response) => {
  const reqTeamID = teamToIDs[request.params.teamName]
  urllib.request(APIURL, function (err, data, res) {
    if (err) {
      response.send(`Error recieving players`)
      throw err
    }
    const allPlayersArary = JSON.parse(data).league.standard
    const reqTeamActivePlayers = allPlayersArary.filter(player => 
      player.teamId === reqTeamID && player.isActive === true)
    response.send(reqTeamActivePlayers)
  })
})

const PORT = 3000
app.listen(PORT,() => {
  console.log(`Server is up and running (PORT: ${PORT})`)
})