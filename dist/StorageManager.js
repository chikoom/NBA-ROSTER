class StorageManager{
  constructor(){
    this.savedTeams = JSON.parse(localStorage.getItem('teams')) || []
  }
  saveTeam = (teamName, teamData, renderCallback) => {
    if (teamName.length < 1) {
      renderCallback(this.getAllTeams(),'Please Enter Team Name')
      return
    }
    if (teamData.length < 5) {
      renderCallback(this.getAllTeams(),'Please Save Team of 5')
      return
    }   
    const objToSave = {}
    objToSave[teamName] = teamData
    this.savedTeams.push(objToSave)
    localStorage.setItem('teams', JSON.stringify(this.savedTeams))
    renderCallback(this.getAllTeams(),'')
  }
  deleteTeam = (teamName) => {
    this.savedTeams = this.savedTeams.filter(team => !team[teamName])
    localStorage.setItem('teams', JSON.stringify(this.savedTeams))
    return this.savedTeams
  }
  getAllTeams = () => {
    return JSON.parse(localStorage.getItem('teams'))
  }
  getTeam = teamName => {
    let selectedTeam = []
    if(teamName!=="0"){
      const allTeams = this.getAllTeams()
      selectedTeam = allTeams.find(team => team.hasOwnProperty(teamName))[teamName]
    }
    return selectedTeam
  }
}