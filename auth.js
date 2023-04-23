const jwt = require('jsonwebtoken');
require("dotenv").config();
const secret = process.env.SECRET;

async function createToken (data){
    return jwt.sign({data},secret,{expiresIn:'1h'})
}

//  async function validToken (req,res,next){
    //      try{
    //          let data = req.headers.authorization.replace('Bearer ', '');
    //          console.log(data);
    //          let result = jwt.verify(data,secret);
    //          console.log(result);
    //         //  req.user = result.data;
    //         // next();
    //         return result
    //      }
    //      catch(err){
    //          res.status(401).send('token incorrect !!!!')
    //      }
    //  }
    
     async function validToken (req,res,next){
        try{
            let Token = req.headers.authorization.replace('Bearer ', '');
            let result = jwt.verify(Token,secret);
            return result
        }
        catch(err){
            throw {message:'token incorrect !'}
        }
    }

    // async function validToken(req, res, next) {
    //     try {
    //       const authHeader = req.headers.authorization;
    //       if (!authHeader || !authHeader.startsWith('Bearer ')) {
    //         throw {status:401, message: 'Unauthorized' };
    //       }
    //       const token = authHeader.split(' ')[1];
    //       const decodedToken = jwt.verify(token, secret);
    //       if (!decodedToken || !decodedToken.userId) {
    //         throw{status:401, message: 'Unauthorized' };
    //       }
    //       req.userId = decodedToken.userId;
    //       console.log(decodedToken); 
    //       next();
    //     } catch (err) {
    //       console.error(err);
    //       return res.status(401).json({ message: 'Unauthorized' });
    //     }
    //   }

      module.exports = {createToken, validToken}