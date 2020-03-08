let express = require('express')
let router = express.Router()
let Product = require('../../models/Product')

router.delete('/', function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err) {
        if (err) {
            console.log(err)
        } else {
            res.send(req.params.id)
        }
    })
})

module.exports = router