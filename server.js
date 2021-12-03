
/* == External  modules == */
const express = require('express');

/* == Internal  modules == */
const routes = require('./routes');

/* == cors == */
const cors = require('cors')

const session = require('express-session')

/* PORT */
const PORT = process.env.PORT || 3000;

/* == Express Instance == */
const app = express();

const MongoDBStore = require('connect-mongodb-session')(session)


/* == DB connection == */
require('./config/db.connection');

/* == middlewares == */
// Setup Cors middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    // This is needed for accept credentials from the front-end
    // not needed if you are not implementing authentication
    credentials: true
}

app.use(cors(corsOptions))

app.set('trust proxy', 1) //trust first proxy

// this line is creating the object "req.session"
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    store: new MongoDBStore({
        uri: process.env.MONGODBURI,
        collection: 'mySessions'
    }),
    cookie: {
        sameSite: 'none',
        secure: true
    }
}))


// what we had before deployment, for reference
// app.use(session({
//   secret: "asdffjk",
//   resave: false,
//   saveUninitialized: false,
// }))

const isAuthenticated = (req, res, next) => {
    if (req.session.currentUser) {
        return next()
    } else {
        res.status(403).json({ msg: "login required" })
    }
}

app.use(express.json());

/* == Routes == */
app.get('/', function (req, res) {
    res.send('hello')
})


app.use('/users', routes.users)


/* == Server Bind == */
app.listen(PORT, () => {
    console.log(`🎉🎊 celebrations happening on http://localhost:${PORT} 🎉🎊`);
});
