const express = require("express");
const router = express.Router();
const userService = require('../BL/user.service');
const { uploadImage } = require("../middlewares/uploadPhoto");

router.post("/createUser", async (req,res)=>{
    try {
        let result = await userService.createNewUser(req.body);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})
router.get("/getUsers/:userId", async (req,res)=>{
    try {
        let result = await userService.getUsersByMessages(req.params.userId);
        res.send(result);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/getUsersByName/:searchQuery", async (req,res)=>{
    try {
        let result = await userService.findUserByName(req.params.searchQuery);
        result.length? res.send(result):res.send(null)
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.post("/uploadAvatar",uploadImage.single('image'), async (req,res)=>{
    try {
        const {clientId}=req.body;
        const imagePath = await req.file.path;
        await userService.updateUser({_id:clientId,newData:{avatar:imagePath}})
        res.send("sucsess");
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})



module.exports = router;