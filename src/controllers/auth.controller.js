// import packages from node_modules
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

// import models
const db = require('../models')
const User = db.user
const Role = db.role

// assign sequelize
const Op = db.Sequelize.Op

// genSalt
const SALT = 10

// token duration = 24 hourse
const EXPIRES_IN = 86400

exports.signUp = (req, res, next) => {
  // create user to database
  User.create({
    email: req.body.email,
    name: req.body.name,
    phone_num: req.body.phone_num,
    password: bcrypt.hashSync(req.body.password, SALT),
  })
    .then((user) => {
      // check roles from body request
      // if there is any roles, then add the defined roles to the db
      if (req.body.roles) {
        Role.findAll({
          where: {
            name: {
              [Op.or]: req.body.roles,
            },
          },
        }).then((roles) => {
          user.setRoles(roles).then(() => {
            res.send({
              message: `User registered`,
            })
          })
        })
      } else {
        // if there is no roles defined
        // set user to client roles
        user.setRoles([1]).then(() => {
          res.send({
            message: `User registered`,
          })
        })
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message,
      })
    })
}

exports.signIn = (req, res, next) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({
          message: `Email is not registered`,
        })
      }

      const passwordIsCorrect = bcrypt.compareSync(
        req.body.password,
        user.password
      )

      if (!passwordIsCorrect) {
        return res.status(401).send({
          message: `Invalid Password`,
        })
      }

      const token = jwt.sign(
        {
          id: user.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: EXPIRES_IN,
        }
      )

      const authorities = []
      user.getRoles().then((roles) => {
        for (let i = 0; i < roles.length; i++) {
          authorities.push('ROLE_' + roles[i].name.toUpperCase())
        }

        res.status(200).send({
          id: user.id,
          email: user.email,
          roles: authorities,
          accessToken: token,
        })
      })
    })
    .catch((err) => res.status(500).send({ message: err.message }))
}
