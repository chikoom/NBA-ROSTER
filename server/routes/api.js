const express = require('express')
const urllib = require('urllib')
const {teamsData, dreamTeam, APIURL, STATSURL, IMAGEURLS} = require('../models/data')
const router = express.Router()

let playersId = 0

router.get('/teams/:teamName', (request, response) => {
  let reqTeamID = ''
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
        id: ++playersId,
        firstName: player.firstName,
        lastName: player.lastName,
        jersey: player.jersey,
        position: player.pos
      }
    })
    response.send({ teamAcr,
                    playersData
                  })
  })
})

router.get('/playerStats/:lastName/:firstName', (request, response) => {
  urllib.request(`${STATSURL}/${request.params.lastName}/${request.params.firstName}`, function (err, data, res) {
    if (err) {
      response.send(`Error recieving stats`)
      throw err
    }
    response.send(data)
  })
})

router.put('/team', (req, res) => {
  if(!teamsData.find(obj => obj.teamId === req.body.teamId))
    teamsData.push(req.body)
  res.send(teamsData)
})

router.get('/dreamTeam', (req,res) => {
  res.send(dreamTeam)
})

router.post('/roster', (req,res) => {
  if(dreamTeam.length < 5){  
    dreamTeam.push(req.body)
    res.send(dreamTeam)
  }
  else
    res.send('DreamTeam Full')
})

router.delete('/roster', (req,res) => {
  const playerId = req.body.playerID
  console.log(req.body)
  console.log('id'+playerId)
  console.log(dreamTeam)
  const playerIndex = dreamTeam.findIndex(player => player.id === playerId)
  if(playerIndex >= 0){
    dreamTeam.splice(dreamTeam.findIndex(player => player.id === playerId),1)
    res.send(dreamTeam)
  } else
    res.send('Didnt find player in DreamTeam')
})

module.exports = router