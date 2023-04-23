require("dotenv").config();
const PORT = process.env.PORT

const express = require('express');
const cors = require('cors');
const app = express();

const userRouter = require("./routes/userRouter")
const MessageRouter = require("./routes/messageRouter")
const connectRouter = require("./routes/connectRouter")

app.use(cors());
app.use(express.json());

app.use('/uploads', express.static('uploads'));
app.use("/", connectRouter)
app.use("/user", userRouter)
app.use("/message", MessageRouter)


const server = app.listen(PORT, () => {
    console.log(`server listening to port ${PORT}`);
})


const WebSocket = require('ws');
const wss = new WebSocket.Server({ server });

wss.on('connection', (ws, req) => {
    const userId = req.url.split('=')[1];
    ws.userId = userId;
    
    // [...wss.clients].forEach(client => {
    // client.send(JSON.stringify({
    //      online: [...wss.clients].filter(c => c.userId != userId).map(cl => cl.userId) }))
    // });
    // [...wss.clients].forEach(client => {
    //     client.send(JSON.stringify({
    //          online: [...wss.clients].map(cl => cl.userId) }))
    //     });
    

    ws.on('message', async (message) => {
        const messageData = JSON.parse(message.toString());
        [...wss.clients]
            .filter(c => c.userId == messageData.receiver)
            .forEach(c => c.send(JSON.stringify(messageData)))
    })

 
})



