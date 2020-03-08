let express = require('express')
let router = express.Router()
let User = require('../../models/User')
// Register
router.post('/', (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        role: "User"
    })

    user.save()
    res.send(user)
})

module.exports = router