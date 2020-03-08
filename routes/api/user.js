let express = require('express')
let router = express.Router()
let User = require('../../models/User')

// Index
router.get('/', (req, res) => {
    User.find({}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})

module.exports = router