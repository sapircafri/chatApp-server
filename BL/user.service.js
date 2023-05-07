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
   const {email, newData} = data;
   return await userDL.update(email,newData);
}

async function forgetPassword(email, code) {
    const subject = 'Forget Password'
    const html = `
      <div dir="RTL" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h1>איפוס סיסמא</h1>
        <p>Dear ${email},</p>
        <p>קיבלנו את בקשתך לאפס את הסיסמה לחשבון שלך..</p>
        <h2>קוד איפוס הסיסמה שלך הוא:${code}</h2>
        <p>לאפס את הקוד אנא הזן קוד זה בטופס איפוס הסיסמה כדי להגדיר סיסמה חדשה.</p>
        <p>אם לא ביקשת איפוס סיסמה, אנא התעלם מאימייל זה.</p>
        <p>,תודה</p>
        <p> chatApp </p>
      </div>`
    await sendMail(email, subject, html)
  
  }

//   async function sendEventDetailsToAdvertiser(email, eventDate) {
//     const {eventName,advertiser,date,beginningTime,finishTime,place} = eventDate;
//     const subject = 'פורסם אירוע חדש - hereEvent'
//     const html = `
//     <div dir="RTL" style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
//      <h1>פרטי אירוע חדש</h1>
//       <p>אירוע חדש פורסם על ידך:</p>
//       <ul>
//       <li>שם האירוע: ${eventName}</li>
//         <li>מפרסם ${advertiser}</li>
//         <li>תאריך האירוע: ${date}</li>
//         <li>שעות האירוע: ${beginningTime}-${finishTime}</li>
//         <li>מיקום האירוע: ${place}</li>
//         <li>  <a href="https://www.youtube.com/">שינוי פרטי האירוע</a> </li>
       
//       </ul>
//     </div>`
//     await sendMail(email, subject, html)
  
//   }

  async function sendMail(email, subject, html) {
    try {
      const transporter = await nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "hereevent1@gmail.com",
          pass: "jeelwvaploojnari"
        }
      });
      const mailOptions = await {
        from: 'hereevent1@gmail.com',
        to: email,
        subject: subject,
        html: html
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      });
  
    } catch (error) {
      throw { message: "something went wrong" }
  
    }
  
  }
  
  async function changePassword(email, newPassword) {
    try {
      const pass = bcrypt.hashSync(newPassword, 10)
      updateUser({ email: email, newData: { password: pass } })
    } catch (error) {
      throw { message: error.message }
    }
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
module.exports = {createNewUser,findUser ,getUser,getUsersByMessages,findUserByName, updateUser ,deleteUser,forgetPassword,changePassword};


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
  