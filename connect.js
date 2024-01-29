const mongoose = require("mongoose")

mongoose.connect('mongodb://localhost:27017/Users').then(()=>console.log("Database Connected"))

module.exports = mongoose; 