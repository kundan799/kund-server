const registerRouter = require('express').Router();
const AuthModel = require('../Models/auth.js');
const bcrypt = require('bcrypt');

// registerRouter.post('/', async (req, res) => {
//    const {name, email, password} = req.body;
//    const isUser = await AuthModel.findOne({email});  
//    if(isUser === null){
//     bcrypt.hash(password, 6, async (err, hash) => {
//         if(err){
//             res.send({msg: "server error signup not completed please try again later."});
//         }else{
//             await AuthModel.create({name, email, password: hash}, (err, hash) => {
//                 if(err){
//                     res.send({msg:"fails to create user, please fill all nessary fields."});
//                 }else{
//                     res.send({msg: "register success."});
//                 }
//             }); 
//         }
//     });
//    }else{
//     res.send({msg: "user already exist."});
//    }   
// });
// registerRouter.post("/", async(req,res)=>{ 
//     const {name,email,password} = req.body 
//     await bcrypt.hash(password,8, function(err, hash){ 
//         if(err){ 
//             return res.send("SIGN UP FAILED") 
//         } 
//         const user = new AuthModel({name,email, password:hash}) 
//         user.save() 
//         return res.send("SIGN UP SUCCESSFULL") 
 
//     }) 
// }) 
registerRouter.post("/",async(req,res)=>{
    const {name,email,password}=req.body;
    // console.log(name,email,password);
    const isUser= await AuthModel.findOne({email})
    if(isUser){
        res.send({msg:"User already exists,try log in"});
    }
    else {
        bcrypt.hash(password, 5, async function(err, hash) {
        // Store hash in your password DB.
        if(err){
            res.send({msg:"Someting Went Wrong"});
        }
        const new_user= new AuthModel({
            name,
            email,
            password:hash
        })
        try{
            await new_user.save();
            res.send({mgs:"SignUp SuccessFully"});
        }
        catch(err){
            res.send({msg:"Something Went Wrong,Try Again Later"});
    
        }
    });
}
})


module.exports = registerRouter;