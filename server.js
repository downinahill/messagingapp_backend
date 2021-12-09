/* == External  modules == */
const express = require('express');

/* == Internal  modules == */
const routes = require('./routes');

/* == cors == */
const cors = require('cors')

const session = require('express-session')

/* PORT */
const PORT = process.env.PORT || 3003;

/* == Express Instance == */
const app = express();

const MongoDBStore = require('connect-mongodb-session')(session)


const Messages = require('./models/dbMessages.js')

/* == DB connection == */
require('./config/db.connection');

/* == middlewares == */
// Setup Cors middleware
const whitelist = ['http://localhost:3000', process.env.HEROKUFRONTURL]
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


const Pusher = require("pusher");

const pusher = new Pusher({
    appId: "1310853",
    key: "9b5fb9e2d4497d2f068a",
    secret: "80e02950041bcc838571",
    cluster: "mt1",
    useTLS: true
});

pusher.trigger("my-channel", "my-event", {
    message: "hello world"
});






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

app.post('/messages/new', (req, res) => {
    const dbMessage = req.body
    Messages.create(dbMessage, (err, data) => {
        if (err)
            res.status(500).send(err)
        else
            res.status(201).send(data)
    })

})


app.get('/messages/sync', (req, res) => {
    Messages.find((err, data) => {
        if (err) {
            res.status(500).send(err)

        } else {
            res.status(200).send(data)
        }
    })
})




app.use('/users', routes.users)
app.use('/post', routes.post)


/* == Server Bind == */
app.listen(PORT, (req, res) => {
    console.log(`🎉🎊 celebrations happening on http://localhost:${PORT} 🎉🎊`);
});
