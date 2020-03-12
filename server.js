let express = require("express"),
    mongoose = require("mongoose"),
    colors = require("colors"),
    bodyParser = require("body-parser"),
    multer = require('multer'),
    cors = require('cors'),
    path = require('path')
// ─── MODEL IMPORT ───────────────────────────────────────────────────────────────
// Product = require('./models/Product')
// User = require('./models/User')
let app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json({ extended: true }))
app.use(cors())

//
// ─── DEFINE MODEL ───────────────────────────────────────────────────────────────
//

let ProductSchema = mongoose.Schema({
    title: String,
    price: Number,
    quantity: Number,
    description: String,
    subtotal: Number,
    image: { type: String, default: "public.png" }
})

const Product = mongoose.model('Product', ProductSchema)

let UserSchema = new mongoose.Schema({
    username: String,
    password: String,
    role: String,
    description: String,
    age: Number,
    address: String,
    image: String,

    firstName: String,
    lastName: String,
    email: String,
    address2: String,
    country: String,
    zip: Number,
    carts: [ProductSchema]
})

const User = mongoose.model('User', UserSchema)

const TransactionSchema = mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    carts: [ProductSchema],
    email: String,
    address: String,
    address2: String,
    country: String,
    zip: Number,
    total: Number,
    paymentMethod: String,
    cardName: String,
    cardNumber: Number,
    expiration: Date,
    cvv: String,
    image: String,
    status: String
})

const Transaction = mongoose.model('Transaction', TransactionSchema)
//
// ─── MULTER CONFIGURATION ───────────────────────────────────────────────────────
//

const productStorage = multer.diskStorage({
    destination: './client/public/uploads/products/',
    filename: function (req, file, cb) {
        cb(null, "Kryptonite-" + Date.now() + path.extname(file.originalname));
    }
})

let uploadProductStorage = multer({ storage: productStorage }).single('image')

const userStorage = multer.diskStorage({
    destination: './client/public/uploads/users/',
    filename: function (req, file, cb) {
        cb(null, "Kryptonite-" + Date.now() + path.extname(file.originalname));
    }
})

let uploadUserStorage = multer({ storage: userStorage }).single('image')

const transactionStorage = multer.diskStorage({
    destination: './client/public/uploads/transactions',
    filename: function (req, file, cb) {
        cb(null, "PaymentProofing-" + Date.now() + path.extname(file.originalname));
    }
})

let uploadTransactionStorage = multer({ storage: transactionStorage }).single('image')
//
// ─── CONNECT DATABASE ───────────────────────────────────────────────────────────
//

mongoose.connect("mongodb://localhost/ecommerce", {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────

//
// ─── UNIVERSAL SIDE ─────────────────────────────────────────────────────────────
//

app.get('/profile/:id', function (req, res) {
    User.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})

app.put('/profile/:id', function (req, res) {
    uploadUserStorage(req, res, (next) => {
        User.findByIdAndUpdate(req.params.id, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            address2: req.body.address2,
            country: req.body.country,
            zip: req.body.zip,
            // ─────────────────────────────────────────────────────────────────
            description: req.body.description,
            age: req.body.age,
            address: req.body.address,
            image: req.file.filename
        }, function (err, data) {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                console.log(data)
                res.send(data)
            }
        })
    })
})

//
// ─── USER SIDE ──────────────────────────────────────────────────────────────────
//

//
// ───────────────────────────────────────────────────────────────────── AUTH ─────
//

app.post('/login', function (req, res) {
    User.findOne({ username: req.body.username }, function (err, user) {
        if (req.body.username === user.username && req.body.password === user.password) {
            res.send(user)
        } else {
            console.log(err)
        }
    })
})
app.post('/register', (req, res) => {
    let user = new User({
        username: req.body.username,
        password: req.body.password,
        role: "User"
    })

    user.save()
    res.send(user)
})

//
// ─────────────────────────────────────────────────────────────── USER INDEX ─────
//

app.get('/user', (req, res) => {
    User.find({}, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})

//
// ───────────────────────────────────────────── INDEX PAGE PRODUCTS SHOWCASE ─────
//    

app.get('/product', (req, res) => {
    Product.find({}, function (err, data) {
        res.send(data)
    })
})

//
// ─── ADMIN SIDE ─────────────────────────────────────────────────────────────────
//    

//
// ──────────────────────────────────────────────────── USER TRANSACTION LIST ─────
//

app.get('/adminList', function (req, res) {
    User.find({ "role": { $regex: /Admin/, $options: 'i' } }, function (err, admin) {
        if (err) {
            console.log(err)
        } else {
            res.send(admin)
        }
    })
})

app.get('/userList', function (req, res) {
    User.find({ "role": { $regex: /User/, $options: 'i' } }, function (err, user) {
        if (err) {
            console.log(err)
        } else {
            res.send(user)
        }
    })
})

app.get('/transactionList', function (req, res) {
    Transaction.find({}, function (err, data) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})

//
// ────────────────────────────────────────────── PRODUCTS MANIPULATION (CRUD) ─────
//

app.post('/product', (req, res) => {
    uploadProductStorage(req, res, (err) => {
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

app.get('/product/description/:id', function (req, res) {
    Product.findById(req.params.id, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
        }
    })
})

app.put('/product/edit/:id', function (req, res) {
    uploadProductStorage(req, res, (next) => {
        Product.findByIdAndUpdate(req.params.id, {
            title: req.body.title,
            price: req.body.price,
            quantity: req.body.quantity,
            description: req.body.description,
            image: req.file.filename
        }, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                res.send(data)
            }
        })
    })
})

app.delete('/product/:id', function (req, res) {
    Product.findByIdAndRemove(req.params.id, function (err, product) {
        if (err) {
            console.log(err)
        } else {
            console.log(`DELETED ***************************************** ${product}`)
        }
    })
})

// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────
// ────────────────────────────────────────────────────────────────────────────────


//
// ─── UNDER DEVELOPMENT ──────────────────────────────────────────────────────────
//

app.post('/cart/:id', function (req, res) {
    User.findById(req.params.id, function (err, user) {
        if (err) {
            res.send(err)
            console.log(err)
        } else {
            user.carts.push({
                carts: req.body.carts
            })
            user.save(function (err, data) {
                if (err) {
                    res.send(err)
                    console.log(err)
                } else {
                    res.send(data)
                    console.log("***************************NEW DATA *****************" + data)
                }
            })
        }
    })
})

app.get('/cart/:id', function (req, res) {
    User.findById(req.params.id, function (err, data) {
        if (err) {
            res.send(err)
            console.log(err)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})

app.post('/checkout', function (req, res) {
    Transaction.create({
        userId: req.body.userId,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        carts: req.body.carts,
        email: req.body.email,
        address: req.body.address,
        address2: req.body.address2,
        country: req.body.country,
        zip: req.body.zip,
        total: req.body.total,
        paymentMethod: req.body.paymentMethod,
        cardName: req.body.cardName,
        cardNumber: req.body.cardNumber,
        expiration: req.body.expiration,
        cvv: req.body.cvv
    }, function (err, data) {
        if (err) {
            console.log(err)
            res.send(data)
        } else {
            console.log(data)
            res.send(data)
        }
    })
}, function (err, data) {
    if (err) {
        res.send(err)
        console.log(err)
    } else {
        res.send(data)
        console.log(data)
    }
})

app.get('/checkout/:id', function (req, res) {
    Transaction.find({ userId: req.params.id }, function (err, data) {
        if (err) {
            console.log(err)
        } else {
            res.send(data)
            console.log(data)
        }
    })
})

app.put('/transaction/:id', function (req, res) {
    uploadTransactionStorage(req, res, (next) => {
        Transaction.findByIdAndUpdate(req.params.id, {
            image: req.file.filename
        }, function (err, data) {
            if (err) {
                console.log(err)
                res.send(err)
            } else {
                console.log(data)
                res.send(data)
            }
        })
    })
})

app.get('/transaction', function (req, res) {
    Transaction.find({ "image": { $regex: /PaymentProofing/, $options: 'i' } }, function (err, data) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})

app.delete('/transaction/delete/:id', function (req, res) {
    Transaction.findByIdAndRemove(req.params.id, function (err, data) {
        if (err) {
            console.log(err)
            res.send(data)
        } else {
            console.log(`DELETED ********************************* ${data}`)
            res.send(data)
        }
    })
})

app.put('/admin/checkTransaction/:id', function (req, res) {
    Transaction.findByIdAndUpdate(req.params.id, { status: req.body.status }, function (err, data) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})

app.put('/deleteStock/:id', function (req, res) {
    Transaction.findByIdAndUpdate(req.params.id, { quantity: req.body.minQuantity }, function (err, data) {
        if (err) {
            console.log(err)
            res.send(err)
        } else {
            console.log(data)
            res.send(data)
        }
    })
})

//
// ─── LOCALHOST ──────────────────────────────────────────────────────────────────
//

app.listen(2020, () => console.log(colors.blue("Server running at port 2020")));
