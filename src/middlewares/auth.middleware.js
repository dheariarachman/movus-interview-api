const jwt = require('jsonwebtoken')
const db = require('../models')
const User = db.user

const verifyToken = (req, res, next) => {
  let token = req.headers['x-access-token']

  if (!token) {
    return res.status(403).send({
      message: `No Token provided`,
    })
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send({
        message: `Token undefined`,
      })
    }

    req.user_id = decoded.id
    next()
  })
}

const isAdmin = (req, res, next) => {
  User.findByPk(req.user_id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).send({
        message: `You are not authorized`,
      })
      return
    })
  })
}

const isSurveyor = (req, res, next) => {
  User.findByPk(req.user_id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'surveyor') {
          next()
          return
        }
      }

      res.status(403).send({
        message: `You are not authorized`,
      })
      return
    })
  })
}

const isAdminOrSurveyor = (req, res, next) => {
  User.findByPk(req.user_id).then((user) => {
    user.getRoles().then((roles) => {
      for (let i = 0; i < roles.length; i++) {
        if (roles[i].name === 'surveyor') {
          next()
          return
        }

        if (roles[i].name === 'admin') {
          next()
          return
        }
      }

      res.status(403).send({
        message: `You are not an Admin or a Surveyor, Please quit!`,
      })
    })
  })
}

const authJwt = {
  verifyToken,
  isAdmin,
  isSurveyor,
  isAdminOrSurveyor,
}

module.exports = authJwt
