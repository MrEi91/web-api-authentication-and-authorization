'use strict'

const user = require('../models/user')
const jwt = require('jsonwebtoken')
const passwordHash = require('password-hash')
const secret = 'mrei91'

let methods = {}

methods.getUsers = (req, res, next) => {
  user.find()
    .then((users) => {
      res.send(users)
    })
    .catch((error) => {
      res.send({
        message: error
      })
    })
}

methods.createUser = (req, res, next) => {
  user.findOne({
    email: req.body.email
  })
    .then((email) => {
      if (email) {
        res.send({
          userAlready: true
        })
      } else {
        user.create({
          email: req.body.email,
          password: passwordHash.generate(req.body.password)
        })
          .then((user) => {
            res.send({
              message: 'SUCCSESS',
              user: user
            })
          })
          .catch((error) => {
            res.send({
              message: 'REGISTER NOT SUCCSESS',
              error: error
            })
          })
      }
    })
    .catch((error) => {
      res.send({
        message: 'Format email is wrong!',
        error: error
      })
    })
}

methods.updateUser = (req, res, next) => {
  user.findOne({
    email: req.params.email
  })
    .then((user) => {
      if (user) {
        user.update(req.body)
          .then(() => {
            res.send({
              message: `User ${user.email} has been updated`
            })
          }).catch((error) => {
            res.send({
              message: error
            })
          })
      } else {
        res.send({
          message: 'User is not found!'
        })
      }
    })
    .catch((error) => {
      res.send({
        message: error
      })
    })
}

methods.deleteUser = (req, res, next) => {
  user.findOne({
    email: req.params.email
  })
    .then((user) => {
      if (user) {
        user.remove(user).then((user) => {
          res.send({
            message: `User ${user.email} has been deleted`
          }).catch((error) => {
            res.send({
              message: 'Delete user error ',
              error: error
            })
          })
        })
      } else {
        res.send({
          message: 'User is not found!'
        })
      }
    })
    .catch((error) => {
      res.send({
        message: error
      })
    })
}

methods.login = (req, res, next) => {
  user.findOne({
    email: req.body.email
  })
    .then((user) => {
      if (!user) {
        res.send({
          userUndefined: true
        })
      } else {
        if (passwordHash.verify(req.body.password, user.password)) {
          let token = jwt.sign({
            email: req.body.email
          }, secret, {})

          res.send({
            token: token
          })
        } else {
          res.send({
            wrongPassword: true
          })
        }
      }
    })
    .catch((error) => {
      res.send({
        error: error
      })
    })
}

methods.verifyToken = (req, res) => {
  let token = req.params.token
  jwt.verify(token, secret, (error, decoded) => {
    if (error) {
      res.send({
        message: error
      })
    }

    if (!decoded) {
      res.send({
        email: false
      })
    } else {
      res.send({
        email: true
      })
    }
  })
}

module.exports = methods
