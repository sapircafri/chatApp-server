const messageDL = require('../DL/controllers/message.controller')


async function createNewMessage(data) {
    let res = await messageDL.create(data);
    return res;
}

async function getMessages(data) {
    const { user1Id, user2Id } = data;
    const messages = messageDL.read({$or: [{ sender: user1Id, receiver: user2Id }, { sender: user2Id, receiver: user1Id }] })   
    return messages;
}

// let message = {
//     sender: "6408bd72db3060cf965526aa",
//     receiver: "6408cffedb4f0ec670629a01",
//     text: "have a nice day"
// }

// createNewMessage(message)
// getUsersByMessages("6400f48a57e935caab246831")
module.exports = {
    createNewMessage, getMessages
    // , updateUser,addSongToRecently
};



// const getMessages = async (user1Id, user2Id) => {
//   try {
//     const messages = await messageData
//       .find({ $or: [{ sender: user1Id, receiver: user2Id }, { sender: user2Id, receiver: user1Id }] })
//       .sort({ timestamp: 1 })
//       .populate('sender')
//       .populate('receiver');
//     return messages;
//   } catch (err) {
//     console.error(err);
//   }
// };
