// import
const mongoose=require("mongoose");
// create
const connect =()=>{
  
    return mongoose.connect("mongodb+srv://kundan:kundan@cluster0.p9sxq25.mongodb.net/revision");
   
  }

  // export
  module.exports=connect;