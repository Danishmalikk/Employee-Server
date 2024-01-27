const express = require("express")
const app = express()
const port = 8001
const route = require('./route/index')

// Connecting to database
require('./connect')

app.use(express.urlencoded({extended: false}))

//Our Application routes
app.use(route)

app.listen(port, ()=>{ 
    console.log(`Server is running on ${port} successfully.`)
} )