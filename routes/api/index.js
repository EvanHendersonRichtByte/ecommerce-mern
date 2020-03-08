let express = require('express');
let router = express.Router();

router.get('/', (req,res) => {
    res.send('Index Route')
})

module.exports = router;