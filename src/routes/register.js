const registerRouter = require('express').Router();
const AuthModel = require('../Models/auth.js');
const bcrypt = require('bcrypt');

registerRouter.post('/', async (req, res) => {
   const {name, email, password} = req.body;
   const isUser = await AuthModel.findOne({email});  
   if(isUser === null){
    bcrypt.hash(password, 6, async (err, hash) => {
        if(err){
            res.send({msg: "server error signup not completed please try again later."});
        }else{
            await AuthModel.create({name, email, password: hash}, (err, data) => {
                if(err){
                    res.send({msg:"fails to create user, please fill all nessary fields."});
                }else{
                    res.send({msg: "register success."});
                }
            }); 
        }
    });
   }else{
    res.send({msg: "user already exist."});
   }   
});

module.exports = registerRouter;