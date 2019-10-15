const router = require('express').Router()
const userRoutes = require('./userRoutes')
const productRoutes = require('./productRoutes')

router.get('/', (req, res, next) => {
  res.status(200).json({ message: 'Welcome' })
})
router.use('/users', userRoutes)
router.use('/products', productRoutes)

module.exports = router
