const mongoose = require('mongoose')
const { Schema, model } = mongoose

const userSchema = new Schema({
  username: { type: String, unique: true, required: true },
  email: { type: String, unique: true, required: true},
  password: String,
  confirmedPassword: String
})

const User = mongoose.model('User', userSchema)

module.exports = User
