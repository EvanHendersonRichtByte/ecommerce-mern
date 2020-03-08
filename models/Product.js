let mongoose = require('mongoose')

let Product = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    description: String,
    image: { type: String, default: "public.png" },
})

module.exports = mongoose.model('Product', Product)