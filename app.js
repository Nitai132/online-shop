const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const {localStrategyHandler, serializeUser, deserializeUser, isValid} = require('./passport');
const fileUpload = require('express-fileupload');
const UsersController = require('./controllers/usersController.js');
const productsController = require('./controllers/productsController');
const ordersController = require('./controllers/ordersController');
const categoriesController = require('./controllers/categoriesController');
const cartController = require('./controllers/cartController');
const countController = require('./controllers/countController');
const path = require('path');
const markdownpdf = require('markdown-pdf');

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static("client2/dist/client2"));
app.use(fileUpload());
app.enable('trust proxy');

app.use(session({
    secret: 'Nitai_Luyckx!$@#$',
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({   
        uri: 'mongodb+srv://nitai:nitai@cluster0.hgigh.mongodb.net/FruitCart',
        collection: 'mySessions'
    }),
    cookie: {
        secure: false,
        httpOnly: false,
        maxAge: 1000 * 60000
    },
  }));

passport.use('local', new LocalStrategy(localStrategyHandler, {
    usernameField: 'email',
    passwordField: 'passwd'
  }));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.use(passport.initialize());
app.use(passport.session());


app.use('/api/auth', UsersController);
app.use('/api/count', countController);
app.use('/api/products', productsController);
app.use('/api/categories', categoriesController);
app.use('/api/cart', cartController);
// app.use('*', isValid);
app.use('/api/orders', ordersController);

app.post('/api/upload', (req, res) => {
    req.files.mypic.mv(path.join(__dirname, 'public/img', req.files.mypic.name), (err) => {
        if (err) {
            return res.status(400).json({});
        };
        res.status(200).json({});
    });
});

app.post('/api/pdf', (req, res) => {
    const {orderId, cartDetails, productsDetails, totalPrice, userDetails, date} = req.body;
    markdownpdf().from.string(`# Nitai's market receipt # \n 
    ${productsDetails.map((detail, index) => '\n' + detail[0].name + ', price:' + detail[0].price + ' amount:' + cartDetails[index].amount)}
     \n total price: ${totalPrice} \n the receipt is for: ${userDetails.firstName + ' ' + 
     userDetails.lastName}, \n date: ${date}`).to(path.join(__dirname, `/public/receipts/${orderId}.pdf`), () => {
        res.json({ path: `/public/receipts/${orderId}.pdf` });
    });
});

app.get("/*", function(req, res) {
    res.sendFile(path.join(__dirname, "client2/dist/client2/index.html"));
    let origin = req.get('origin'); 
    res.header('Access-Control-Allow-Origin', origin);
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
  });

  
const init = async () => {
    try {
        await mongoose.connect('mongodb+srv://nitai:nitai@cluster0.hgigh.mongodb.net/FruitCart', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        app.listen(process.env.PORT || 4422, (err) => {
            console.log('server is up');
        });
    } catch (err) {
        console.log(err);
    };
};

init();
