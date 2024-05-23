const authorController = require('./controllers/authorController')
const userController = require('./controllers/userController')
const router = require('express').Router()

//GET /register
router.get('/register', userController.registerForm)

router.get('/register', userController.postRegister)


module.exports = router