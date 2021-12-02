const userService = require('../services/user')
const dotenv = require('dotenv')
dotenv.config()

const login = async (req, res, next) => {
  const { email } = req.body
  const usr = await userService.findUserByEmail(email)
  if (!usr) {
    return res.json({
      error: 'User does not exist'
    })
  }
  const result = await userService.login(req.body)
  if (result.token) {
    res.json(result)
  } else {
    res.status(401).json(result)
  }
}

const register = async (req, res, next) => {
  if (await userService.findUserByEmail(req.body.email)) {
    return res.status(401).json({
      error: 'User already exists'
    })
  }
  res.json(await userService.addUser(req.body))
}

const getMe = (req, res, next) => {
  res.json({
    email: req.email,
    token: req.token
  })
}

module.exports = {
  login,
  register,
  getMe
}