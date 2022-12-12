const loginRouter = require('express').Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const AuthModel = require('../Models/auth.js');

// loginRouter.post('/', async (req, res) => {
//     const { email, password } = req.body; 
//     const hash = await AuthModel.findOne({email});   
   
//     if(hash !== null){
//         bcrypt.compare(password, hash.password, function(err, result) {
//             if(result){
//                 const token = jwt.sign({userId: hash._id, name: hash.name},"secretcode1234")
//                 res.send({msg: "login success", token: token});
//             }else{
//                 res.send({msg: "wrong password!"});
//             }
//         });
//     }else{
//         res.send({msg: "wrong email!"});
//     }
// });
// loginRouter.post("/",async(req,res)=>{
//     const {email,password}=req.body;
//     const user=await AuthModel.findOne({email})
//     const hashed_password=user.password;
//     const user_id=user._id;
//     console.log(user);
//     console.log(user_id);
//     bcrypt.compare(password, hashed_password, function(err, result) {
//         // result == true
//         if(err){
//             res.send("Something Went Wrong,Try again Later");
//         }
       
//         if(result){
//             const token=jwt.sign({user_id},"secretcode1234");
//             res.send({"msg":"Login SuccessFully",token});
//         }
//         else{
//             res.send("Login Failed");
//         }
//     });

// })

// module.exports = loginRouter;