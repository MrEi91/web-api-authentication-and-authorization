'user strict'
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const validate = require('mongoose-validator')

require('../config/db')

let email_validator = [
  validate({
    validator: 'isEmail',
    message: 'Email is not valid!'
  })
]

let password_validator = [
  validate({
    validator: 'isLength',
    arguments: [3],
    message: 'Password minimal 3 character'
  })
]

let userSchema = new Schema({
  email: {
    type: String,
    required: [true,'Email is require'],
    validate: email_validator
  },
  password: {
    type: String,
    required: [true,'Password is require'],
    validate: password_validator
  }
}, {
  timestamps: true
})

let user = mongoose.model('user', userSchema)

module.exports = user
