const userData = require('../models/user.model')
const messageData = require('../models/message.model')


async function create(data) {
    return await userData.create(data)
}
async function read(filter) {
    return await userData.find(filter)
}
async function readUsersByMessages(filter) {
    const result = await messageData.find(filter)
        .populate('sender', 'fname lname avatar')
        .populate('receiver', 'fname lname avatar')
        .sort({ timestamp: 1 })
    return result;
}
async function readOne(filter) {
    let res = await read(filter)
    return res[0]
}
async function update(_id, newData) {
    return await userData.updateOne({ _id: _id }, newData)
}
async function del(id) {
    return await update(id, { isActive: false })
}

module.exports = { create, read,readUsersByMessages, update, del,readOne }