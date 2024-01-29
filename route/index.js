const express = require('express')
const { homePage, handleRegister, handleLogin, handleEmployee, showEmployee, editEmployee, deleteEmployee } = require('../controller/user')
const router = express.Router()

router.get('/', homePage)
router.post('/register', handleRegister)
router.post('/login', handleLogin)

router.post('/employee', handleEmployee)
router.get('/showemployee', showEmployee)
router.put('/editemployee/:id', editEmployee)
router.delete('/deleteemployee/:id', deleteEmployee)

module.exports = router; 
