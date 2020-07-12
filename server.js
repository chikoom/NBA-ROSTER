const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const router = require('./server/routes/api')
const data = require('./server/models/data')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended:false }))
app.use(express.static(path.join(__dirname, 'dist')))
app.use(express.static(path.join(__dirname, 'node_modules')))
app.use('/', router)

data.getAllPlayers()

const PORT = 3000
app.listen(PORT,() => {
  console.log(`Server is up and running (PORT: ${PORT})`)
})



