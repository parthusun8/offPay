const mongoose = require('mongoose');
const user = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password : {
        type: String,
        required: true
    },
    publicId: {
        type: String,
        required: true
    },
    privateToken: {
        type: String,
        required: true,
        default : "nil"
    },
    balance: {
        type: Number,
        required: true,
        default: 0
    }
})

module.exports = mongoose.model('user', user);