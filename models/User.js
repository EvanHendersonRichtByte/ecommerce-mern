let mongoose = require('mongoose')

let User = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    description: String,
    age: Number,
    address: String,
    image: String
})

module.exports = mongoose.model('User', User)