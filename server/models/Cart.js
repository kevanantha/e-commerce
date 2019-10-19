const { Schema, model } = require('mongoose')

const cartSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product'
  },
  quantity: {
    type: Number
  },
  totalPrice: {
    type: String
  }
})

const Cart = model('Cart', cartSchema)

module.exports = Cart
