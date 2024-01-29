const express = require("express")
const app = express()
const port = 8001
const route = require('./route/index')
const cors = require('cors')
var bodyParser = require('body-parser')


// Connecting to database
require('./connect')

app.use(cors())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
       next();
 });

//Our Application routes
app.use(route)

app.listen(port, ()=>{ 
    console.log(`Server is running on ${port} successfully.`)
} )