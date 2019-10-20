const Cart = require('../models/Cart')

module.exports = {
  async findAllByUserId(req, res, next) {
    try {
      const carts = await Cart.find({ userId: req.user.id }).populate(['userId', 'productId'])
      res.status(200).json(carts)
    } catch (err) {
      next(err)
    }
  },
  async create(req, res, next) {
    try {
      const { productId, quantity, totalPrice } = req.body
      const cart = await Cart.create({ productId, quantity, totalPrice, userId: req.user.id })
      res.status(201).json(cart)
    } catch (err) {
      next(err)
    }
  },
  async delete(req, res, next) {
    try {
      const deleted = await Cart.deleteOne({
        _id: req.params.cartId
      })
      res.status(204).json(deleted)
    } catch (err) {
      next(err)
    }
  },
  async update(req, res, next) {
    try {
      const { productId, quantity, totalPrice } = req.body
      const updated = await Cart.updateOne(
        {
          _id: req.params.cartId
        },
        { productId, quantity, totalPrice, userId: req.user.id },
        { runValidators: true }
      )
      res.status(204).json(updated)
    } catch (err) {
      next(err)
    }
  },
  async updateQty(req, res, next) {
    try {
      const updated = await Cart.updateOne(
        {
          _id: req.params.cartId
        },
        {
          $set: {
            quantity: req.body.quantity
          }
        }
      )
      res.status(200).json(updated)
    } catch (err) {
      next(err)
    }
  }
}
