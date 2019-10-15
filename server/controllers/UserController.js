const User = require('../models/User')
const { generateToken } = require('../helpers/jwt')
const { comparePassword } = require('../helpers/bcrypt')

module.exports = {
  async login(req, res, next) {
    try {
      const user = await User.findOne({
        email: req.body.email
      })
      if (user && comparePassword(req.body.password, user.password)) {
        const token = generateToken({
          id: user._id,
          email: user.email
        })
        res.status(200).json({ token })
      } else {
        const err = new Error('Invalid email/password')
        err.name = 'AuthenticationError'
        next(err)
      }
    } catch (err) {
      next(err)
    }
  },
  async register(req, res, next) {
    try {
      const user = await User.create({
        email: req.body.email,
        password: req.body.password
      })
      const token = generateToken({
        id: user._id,
        email: user.email
      })
      res.status(201).json({ token })
    } catch (err) {
      next(err)
    }
  },
  async index(req, res, next) {
    try {
      res.status(200).json('index')
    } catch (err) {
      next(err)
    }
  }
}
