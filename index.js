const express = require("express");
const cors = require("cors");
const connect = require("./src/comfig/db");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AuthModel = require('./src/Models/auth');
// const registerRouter = require("./src/routes/register");
// const loginRouter = require("./src/routes/login");
//const { middleware } = require("./Middleware/auth.middleware.js");

const app = express();

app.use(express.json());
app.use(cors());
require("dotenv/config");
//app.use(middleware);
//
//

// app.use("/register", registerRouter);
// app.use("/login", loginRouter);

app.get("/", (req, res) => res.send("hello"));

app.post("/login",async(req,res)=>{
  const {email,password}=req.body;
  const user=await AuthModel.findOne({email})
  const hashed_password=user.password;
  const user_id=user._id;
  console.log(user);
  console.log(user_id);
  bcrypt.compare(password, hashed_password, function(err, result) {
      // result == true
      if(err){
          res.send("Something Went Wrong,Try again Later");
      }
     
      if(result){
          const token=jwt.sign({user_id},"secretcode1234");
          res.send({"msg":"Login SuccessFully",token});
      }
      else{
          res.send("Login Failed");
      }
  });

})

app.post("/signup",async(req,res)=>{
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

app.listen(8080, async () => {
  
  try{
    await connect();
    console.log("connected to db")

  }catch(e){
    console.log("something went wrong")

  }
  console.log("server started on port 8080");
});
