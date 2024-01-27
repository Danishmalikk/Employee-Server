const express = require('express')
const {homePage, register} = require('../controller/user')
const router = express.Router()

router.get('/',homePage)
router.post('/register',register)



module.exports = router; 
