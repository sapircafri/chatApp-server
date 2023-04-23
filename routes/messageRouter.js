const express = require("express");
const router = express.Router();
const massageService = require('../BL/message.service');
const { uploadFiles } = require("../middlewares/uploadFiles");


router.post("/createMessage", async (req,res)=>{
    try {
        let result = await massageService.createNewMessage(req.body);
        res.send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/getMessages/:user1Id/:user2Id", async (req,res)=>{
    try {
        let result = await massageService.getMessages(req.params);
        res.send(result);  
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post("/uploadFile",uploadFiles.single('file'), async (req,res)=>{
    try {
        const {sender,receiver}=req.body;
        const filePath = await `http://localhost:4000/${req.file.path}`;
        const message = {
            sender:sender,
            receiver:receiver,
            file:filePath
        }
        await massageService.createNewMessage(message)
        res.send(filePath);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})



module.exports = router;