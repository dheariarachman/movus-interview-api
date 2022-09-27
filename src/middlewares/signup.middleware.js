const db = require('../models')
const ROLES = db.ROLES
const User = db.user

const checkDuplicateEmail = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((user) => {
    if (user) {
      res.status(400).send({
        message: `Email already exists`,
      })
      return
    }

    User.findOne({
      where: {
        phone_num: req.body.phone_num,
      },
    }).then((user) => {
      if (user) {
        res.status(400).send({
          message: `Phone number already registered`,
        })
        return
      }

      next()
    })
  })
}

const checkRolesExisted = (req, res, next) => {
  if (req.body.roles) {
    for (let i = 0; i < req.body.roles.length; i++) {
      if (!ROLES.includes(req.body.roles[i])) {
        res.status(400).send({
          message: `Role is existed`,
        })
        return
      }
    }
  }
  next()
}

const verifySignup = {
  checkDuplicateEmail: checkDuplicateEmail,
  checkRolesExisted: checkRolesExisted,
}

module.exports = verifySignup
