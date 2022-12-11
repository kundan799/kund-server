const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthModel = require('../Models/auth.js');

loginRouter.post('/', async (req, res) => {
    const { email, password } = req.body; 
    const hash = await AuthModel.findOne({email});   
   
    if(hash !== null){
        bcrypt.compare(password, hash.password, function(err, result) {
            if(result){
                const token = jwt.sign({userId: hash._id, name: hash.name},"secretcode1234")
                res.send({msg: "login success", token: token});
            }else{
                res.send({msg: "wrong password!"});
            }
        });
    }else{
        res.send({msg: "wrong email!"});
    }
});

module.exports = loginRouter;