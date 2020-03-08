let express = require('express');
let router = express.Router();
let Product = require('../../models/Product');
let multer = require('multer')
let path = require('path')


//
// ─── MULTER CONFIGURATION ───────────────────────────────────────────────────────
//

const storage = multer.diskStorage({
    destination: './client/public/uploads/products/',
    filename: function (req, file, cb) {
        cb(null, "Kryptonite-" + Date.now() + path.extname(file.originalname));
    } 
})

let upload = multer({ storage: storage }).single('image')


router.get('/', (req, res) => {
    Product.find({}, function (err, data) {
        res.send(data)
    })
})

router.post('/', (req, res) => {
    upload(req, res, (err) => {
        Product.create({
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            image: req.file.filename
        })
        console.log(req.file)
        res.send('Product added!')
    })
})

module.exports = router;