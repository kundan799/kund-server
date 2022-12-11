// import
const mongoose=require("mongoose");
// create
const connect =()=>{
  
    return mongoose.connect(process.env.mongo_url);
   
  }

  // export
  module.exports=connect;