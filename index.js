const express = require('express')
const Approute = require('./routes/route')
var bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: false }))

app.use(bodyParser.json())

app.use('/api', Approute)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))