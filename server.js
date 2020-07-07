const express = require('express')
const path = require('path')
const urllib = require('urllib')

const app = express()

const APIURL = 'http://data.nba.net/10s/prod/v1/2018/players.json'
const IMAGEURLS = 'https://nba-players.herokuapp.com/players/:lastName/:firstName'

const teamToIDs = {
  "lakers": "1610612747",
  "warriors": "1610612744",
  "heat": "1610612748",
  "suns": "1610612756"
}

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

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
    
    const relevantData = reqTeamActivePlayers.map(player => {
      return {
        firstName: player.firstName,
        lastName: player.lastName,
        jersey: player.jersey,
        position: player.pos
      }
    })

    response.send(relevantData)
  })
})

const PORT = 3000
app.listen(PORT,() => {
  console.log(`Server is up and running (PORT: ${PORT})`)
})



