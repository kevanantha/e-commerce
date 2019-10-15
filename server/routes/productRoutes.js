const router = require('express').Router()
const { ProductController } = require('../controllers')
const { authentication } = require('../middlewares/auth')

router.get('/', ProductController.index)
router.use(authentication)
router.post('/create', ProductController.create)

module.exports = router
