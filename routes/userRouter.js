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
        const {email}=req.body;
        const imagePath = await `https://chatapp-735s.onrender.com/${req.file.path}`;
        await userService.updateUser({email:email,newData:{avatar:imagePath}})
        res.send(imagePath);
        
    } catch (error) {
        res.status(500).send(error.message);
    }
})



module.exports = router;