require('../db').connect()

const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
    
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true
  },
  text: {
    type: String,
    // required: true
  },
  file: {
    type: String,
   },
  timestamp: {
    type: Date,
    default: Date.now
  },
  read: {
    type: Boolean,
    default: false
  }
});

const messageData = mongoose.model('message', messageSchema);

module.exports = messageData;


// Hi, I'm working on a react JS chat application, I have 2 schemas

// const userSchema = new mongoose.Schema({

//     fname: {
//         type: String,
//         required: true,
//     },
//     lname: {
//         type: String,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true,
//     },
//     // hash: {
//     //     type: String,
//     //     required: true,
//     //     // select : false
//     // },
//     avatar: {
//         type: String,
//         default: 'default-avatar.png'
//     },
//     online: {
//         type: Boolean,
//         default: false
//     },
//     lastSeen: {
//         type: Date,
//         default: Date.now
//     },
//     createDate: {
//         type: Date,
//         default: Date.now
//     },
//     permission: {
//         type: String,
//         enum: ["admin", "editor", "viewer"],
//         default: "viewer"
//     },
//     isActive: {
//         type: Boolean,
//         default: true
//     }


// })


// AND 

// const messageSchema = new mongoose.Schema({
    
//   sender: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true
//   },
//   receiver: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'user',
//     required: true
//   },
//   text: {
//     type: String,
//     required: true
//   },
//   timestamp: {
//     type: Date,
//     default: Date.now
//   },
//   read: {
//     type: Boolean,
//     default: false
//   }
// });

// With the entire program, how can I pull the people he talked to and put them on the list, can yot write a simple code please? in Js
