require('../db').connect()

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    fname: {
        type: String,
        required: true,
    },
    lname: {
        type: String,
        required: true,
    },
    
    email:{
        type:String,
        required:true,
        unique: true,
        trim: true,
    }, 

    password: {
        type: String,
        required: true,
    },
    // hash: {
    //     type: String,
    //     required: true,
    //     // select : false
    // },
    avatar: {
        type: String,
        default: 'default-avatar.png'
    },
    online: {
        type: Boolean,
        default: false
    },
    lastSeen: {
        type: Date,
        default: Date.now
    },
    createDate: {
        type: Date,
        default: Date.now
    },
    permission: {
        type: String,
        enum: ["admin", "editor", "viewer"],
        default: "viewer"
    },
    isActive: {
        type: Boolean,
        default: true
    }


})

const userData = mongoose.model('user', userSchema)

module.exports = userData;

