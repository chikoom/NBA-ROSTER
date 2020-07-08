const express = require('express')
const path = require('path')
const urllib = require('urllib')
const {teamsData, APIURL, STATSURL, IMAGEURLS} = require('./data')

const app = express()

app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))

app.get('/teams/:teamName', (request, response) => {
  let reqTeamID = '';
  for(team of teamsData){
    if(team.simpleName.toLowerCase() === request.params.teamName){
      reqTeamID = String(team.teamId)
      teamAcr = team.abbreviation.toLowerCase()
    }
  }
  urllib.request(APIURL, function (err, data, res) {
    if (err) {
      response.send(`Error recieving players`)
      throw err
    }
    const allPlayersArary = JSON.parse(data).league.standard
    const reqTeamActivePlayers = allPlayersArary.filter(player => 
      player.teamId === reqTeamID && player.isActive === true)
    
    const playersData = reqTeamActivePlayers.map(player => {
      return {
        firstName: player.firstName,
        lastName: player.lastName,
        jersey: player.jersey,
        position: player.pos
      }
    })

    //response.send(relevantData)
    response.send({ teamAcr,
                    playersData
                  })
  })
})

app.get('/playerStats/:lastName/:firstName', (request, response) => {
  urllib.request(`${STATSURL}/${request.params.lastName}/${request.params.firstName}`, function (err, data, res) {
    if (err) {
      response.send(`Error recieving stats`)
      throw err
    }
    response.send(data)
  })
})

const PORT = 3000
app.listen(PORT,() => {
  console.log(`Server is up and running (PORT: ${PORT})`)
})



