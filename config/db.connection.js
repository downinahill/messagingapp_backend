const mongoose = require('mongoose')

// === Connection string ===
const connectionStr = process.env.MONGODBURI || 'mongodb://localhost:27017/messaging'

// Set up out connection

mongoose.connect(connectionStr, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

mongoose.connection.on('connected', () => console.log('mongodb connected 👻'))
mongoose.connection.on('error', (error) => console.log('mongodb error', error))
mongoose.connection.on('disconnect', () => console.log('mongodb disconnected👋🏾'))

