const userDL = require('../DL/controllers/user.controller')
const messageDL = require('../DL/controllers/message.controller')
const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt')

async function createNewUser(data) {
    let res = await userDL.create(data);
    return res;
}

async function getUser(data) {
    const {_id} = data;
    return await userDL.read(_id);
}

async function findUser(email){
    let res = await userDL.readOne({email:email});
    return res;
}

async function findUserByName(searchQuery){
    let res = await userDL.read({
        $or:[
        {fname:{$regex:searchQuery, $options:'i'}},
        {lname:{$regex:searchQuery, $options:'i'}},
        ]
    });
    return res;
}

async function getUsersByMessages(userId) {
    const users = await (await userDL.readUsersByMessages({ $or: [{ receiver: userId }, { sender: userId }] }));
    const uniqueUsers = Object.values(
        users.reduce((acc, msg) => {
            const otherUser = String(msg.sender._id) === "6400f48a57e935caab246831" ? msg.receiver : msg.sender;
            acc[otherUser._id] = otherUser;
            return acc;
        }, {})
    );
    
    return uniqueUsers;
     // const uniqueUsers = Object.values(
    //     res.reduce((acc, msg) => {
    //         const otherUser = String(msg.sender._id) === "6400f48a57e935caab246831" ? msg.receiver : msg.sender;
    //         acc[otherUser._id] = otherUser;
    //         return acc;
    //     }, {})
    // );

    // const arr = [];
    // uniqueUsers.map(v => arr.push(v._id))
    // const usersQuery = userData.find({ _id: { $in: Array.from(arr) } })
    // .select('fname lname avatar')

    // const users = await usersQuery.exec()
}


async function updateUser(data) {
   const {_id, newData} = data;
   return await userDL.update(_id,newData);
}

async function forgetPassword(){
    const transporter = await nodemailer.createTransport({
        service:"gmail",
        auth:{
            user:"hereevent1@gmail.com",
            pass:"jeelwvaploojnari"
        }
    });

    const mailOptions = await {
        from: 'hereevent1@gmail.com',
        to:'sapircafri@gmail.com',
        subject: 'Forgot Password',
        text: 'Please click on the following link to reset your password: http://localhost:3000/resetPass'
      };

      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
}



async function deleteUser(data) {
    const {_id} = data;
    return await userDL.del(_id);
 }
 


let user={
    fname: 'david ',
    lname:'levi',
    password: '1234',
}
// createNewUser(user)
// forgetPassword()
// getUsersByMessages("6408cffedb4f0ec670629a01")
// const Password = '2222'
// const pass = bcrypt.hashSync(Password, 10)
// updateUser({_id:"6408d02edb4f0ec670629a05",newData:{password:pass}})
// findUserByName("sa")
module.exports = {createNewUser,findUser ,getUser,getUsersByMessages,findUserByName, updateUser ,deleteUser};


// const userSchema = new mongoose.Schema({
//     fname: {
//       type: String,
//       required: true,
//     },
//     lname: {
//       type: String,
//       required: true,
//     },
//     password: {
//       type: String,
//       required: true,
//     },
//     avatar: {
//       type: String,
//       default: 'default-avatar.png'
//     },
//     online: {
//       type: Boolean,
//       default: false
//     },
//     lastSeen: {
//       type: Date,
//       default: Date.now
//     },
//     createDate: {
//       type: Date,
//       default: Date.now
//     },
//     permission: {
//       type: String,
//       enum: ["admin", "editor", "viewer"],
//       default: "viewer"
//     },
//     isActive: {
//       type: Boolean,
//       default: true
//     },
//     // Array of users that the current user has talked to
//     conversations: [{
//       user: {
//         type: mongoose.Schema.Types.ObjectId,
//         ref: 'user',
//       },
//       lastMessageDate: {
//         type: Date,
//         default: Date.now
//       }
//     }]
//   });
  
//   // Get the list of users that the current user has talked to, sorted by the date of the last message
//   async function getConversations(currentUserId) {
//     const user = await User.findById(currentUserId).populate('conversations.user');
  
//     // Sort the conversations array by the date of the last message in descending order
//     user.conversations.sort((a, b) => b.lastMessageDate - a.lastMessageDate);
  
//     // Extract the list of users from the sorted conversations array
//     const users = user.conversations.map(conversation => conversation.user);
  
//     return users;
//   }
  






//   // Add a new conversation to the array
// async function addConversation(currentUserId, otherUserId, lastMessageDate) {
//     await User.findByIdAndUpdate(
//       currentUserId,
//       { $addToSet: { conversations: { user: otherUserId, lastMessageDate } } }
//     );
//   }
  