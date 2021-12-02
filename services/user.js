const jwt = require('jsonwebtoken')
const { omit } = require('lodash')

const User = require('../models/user')

const findUserByEmail = async email => {
  let usr = await User.findOne({ email: email })
  return usr;
}

const addUser = async user => {
  let usr = new User(user)
  let userRes = await usr.save()
  return omit(userRes._doc, 'password')
}

const login = async user => {
  const {
    email,
    password
  } = user
  const usr = await findUserByEmail(email)
  if (password === usr.password) {
    const token = jwt.sign(
      {
        ...usr.toAuthJSON(),
        expiredAt: new Date().getTime() + 1000 * 60 * 60
      },
      process.env.JWT_SECRET
    )
    return {
      ...usr.toAuthJSON(),
      token: token
    }
  }
  return {
    error: 'Wrong Password'
  }
}

module.exports = {
  addUser,
  findUserByEmail,
  login
}