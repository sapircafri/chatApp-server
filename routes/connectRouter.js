const express = require("express");
const router = express.Router();
const auth = require('../auth');
const bcrypt = require('bcrypt')

const userService = require('../BL/user.service')
let user;

router.post("/sign-up", async (req, res) => {
    try {
        const { fname, lname, email, Password } = req.body;
        const password = bcrypt.hashSync(Password, 10)
        user = {
            fname,
            lname,
            password,
            email,
        };
        const newUser = await userService.createNewUser(user)
        const token = await auth.createToken(newUser.email)
        res.send([newUser, token])

    } catch (error) {
        res.sendStatus(500).send("error: "+ error)
    }

})

router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userService.findUser(email)
        const valid = await bcrypt.compare(password, user.password);
        if (valid) {
            const token = await auth.createToken(user.email)
            res.send([user, token])
        }
        else{
            throw {message: "username or password incorrect"}
        }
    } catch (error) {
        res.status(500).send(error.message);
    }
})

router.get("/checkToken", async (req, res) => {
    try {
        let valid = await auth.validToken(req)
        console.log("valid",valid);
        let user = await userService.findUser(valid.data)
        res.send(user)

    } catch (error) {
        res.status(500).send(error.message);
    }
   
})

router.post('/forgetPassword',async (req,res)=>{
    try {
      const { email, code } = req.body;
    //   await userService.forgetPassword(email,code);
      console.log(email,code);
      res.status(200).send("succses")
  
    } catch (error) {
      res.status(500).send(error.message);
    }
  })
  
  router.post('/resetPassword',async (req,res)=>{
    try {
      const { email ,newPassword } = req.body;
      await userService.changePassword(email,newPassword);
      res.status(200).send("password change")
  
    } catch (error) {
      res.status(500).send(error.message);
    }
  })










module.exports = router;