const express = require('express')
const urllib = require('urllib')
const data = require('../models/data')

const router = express.Router()

router.get('/teams/:teamName', (request, response) => {
  const teamNames = getTeamNames(request.params.teamName)
  if (data.state.isLoaded) {
    const playersData = getTeamPlayers(String(teamNames.teamId), data.allPlayersData)
    response.send({ teamAcr: teamNames.abbreviation.toLowerCase(), playersData })
  } else {
    urllib.request(data.APIURL, function (err, resData, res) {
      if (err) {
        response.send(`Error recieving players`)
        throw err
      }
      const allPlayersArary = JSON.parse(resData).league.standard
      const reqTeamActivePlayers = allPlayersArary.filter(player => 
        player.teamId === String(teamNames.teamId) && player.isActive === true)
      const playersData = reqTeamActivePlayers.map(player => {
        return {
          id: ++data.state.playersIds,
          firstName: player.firstName,
          lastName: player.lastName,
          jersey: player.jersey,
          position: player.pos
        }
      })
      response.send({ teamAcr:teamNames.abbreviation.toLowerCase(), playersData })
    })
  }
})

router.get('/playerStats/:lastName/:firstName', (request, response) => {
  urllib.request(`${data.STATSURL}/${request.params.lastName}/${request.params.firstName}`,
    function (err, data, res) {
    if (err) {
      response.send(`Error recieving stats`)
      throw err
    }
    response.send(data)
  })
})

router.put('/team', (req, res) => {
  if (!data.teamsData.find(obj => obj.teamId === req.body.teamId))
    data.teamsData.push(req.body)
  res.send(data.teamsData)
})

router.get('/dreamTeam', (req,res) => {
  res.send(data.dreamTeam)
})

router.post('/roster', (req,res) => {
  if(data.dreamTeam.find(player => player.id === req.body.id)){
    res.send('double')
  } else if (data.dreamTeam.length >= 5) {
    res.send('full')
  } else {
    data.dreamTeam.push(req.body)
    res.send(data.dreamTeam)
  }
})

router.delete('/roster', (req,res) => {
  const playerId = req.body.playerID
  const playerIndex = data.dreamTeam.findIndex(player => player.id === playerId)
  if (playerIndex >= 0) {
    data.dreamTeam.splice(data.dreamTeam.findIndex(player => player.id === playerId),1)
    res.send(data.dreamTeam)
  } else
    res.send('Didnt find player in DreamTeam')
})

const getTeamPlayers = (teamID, allPlayers) => {
  const reqTeamPlayers = allPlayers.filter(player => 
    player.teamId === teamID && player.isActive === true)
  const playersData = reqTeamPlayers.map(player => {
    return {
      id: ++data.state.playersIds,
      firstName: player.firstName,
      lastName: player.lastName,
      jersey: player.jersey,
      position: player.pos
    }
  })
  return reqTeamPlayers
}

const getTeamNames = (teamName) => {
  const teamNames = data.teamsData.filter(team => team.simpleName.toLowerCase() === teamName)
  return teamNames[0]
}

module.exports = router