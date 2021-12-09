const mongoose = require('mongoose')
const messagingSchema = mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
})

const Message = mongoose.model('messagingmessages', messagingSchema)
module.exports = Message