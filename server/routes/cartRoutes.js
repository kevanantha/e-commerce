const router = require('express').Router()
const { CartController } = require('../controllers')
const { authentication } = require('../middlewares/auth')

router.use(authentication)
router.get('/', CartController.findAllByUserId)
router.post('/create', CartController.create)
router.patch('/:cartId/updateQty', CartController.updateQty)

module.exports = router
