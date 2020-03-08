let express = require('express')
let router = express.Router()
let Admin = require('../../models/Admin')

router.get('/', (req,res) => {
    Admin.find({} , function (err,data) {
        res.send(data)
    })
})

router.post('/', (req,res) => {
    Admin.create({
        username: req.body.username,
        password: req.body.password
    })
    res.send('Added')
})

module.exports = router