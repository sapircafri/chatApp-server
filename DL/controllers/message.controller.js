const messageData = require('../models/message.model')
const userData = require('../models/user.model')


async function create(data) {
    return await messageData.create(data)
}
async function read(filter) {
    return await messageData.find(filter).sort({ timestamp: 1 })
}

async function readOne(filter) {
    let res = await read(filter)
    return res[0]
}
async function update(id, newData) {
    return await messageData.updateOne({ _id: id }, newData)
}
async function del(id) {
    return await update(id, { isActive: false })
}


// readUsersByMessages({ $or: [{ receiver: '6400f48a57e935caab246831' }, { sender: '6400f48a57e935caab246831' }] })

module.exports = { create, read, update, del, readOne }