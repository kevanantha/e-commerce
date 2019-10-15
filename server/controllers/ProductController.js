const Product = require('../models/Product')

module.exports = {
  async index(req, res, next) {
    try {
      const products = await Product.find()
      res.status(200).json(products)
    } catch (err) {
      next(err)
    }
  },
  async create(req, res, next) {
    try {
      const { name, price, stock, image, description } = req.body
      const product = await Product.create({
        name,
        price,
        stock,
        image,
        description
      })
      res.status(201).json(product)
    } catch (err) {
      next(err)
    }
  }
}
