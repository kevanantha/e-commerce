const router = require('express').Router()
const { UserController } = require('../controllers')

router.get('/:userId', UserController.findOne)
router.post('/login', UserController.login)
router.post('/register', UserController.register)

module.exports = router
