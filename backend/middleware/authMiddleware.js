const jwt = require('jsonwebtoken')
const User = require('../models/user')

const protect =async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1]

      const decoded = jwt.verify(token, process.env.secretOrKey)

      req.user = await User.findById(decoded.id).select('-password')
      

      next()
    } catch (error) {
      // console.error(error)
      res.status(401)
      const err = 'Not authorized, token failed'
      // err.status = 401
      // throw new Error('Not authorized, token failed')
      next(err)
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
    // next(err)
  }
}

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next()
  } else {
    res.status(401)
    throw new Error('Not authorized as an admin')
  }
}


module.exports = {protect,admin};