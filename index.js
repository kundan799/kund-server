const express = require("express");
const cors = require("cors");
const connect = require("./src/comfig/db");

const registerRouter = require("./src/routes/register");
const loginRouter = require("./src/routes/login");
//const { middleware } = require("./Middleware/auth.middleware.js");

const app = express();

app.use(express.json());
app.use(cors());
require("dotenv/config");
//app.use(middleware);
//
//

app.use("/register", registerRouter);
app.use("/login", loginRouter);

app.get("/", (req, res) => res.send("hello"));

app.listen(8080, async () => {
  
  try{
    await connect();
    console.log("connected to db")

  }catch(e){
    console.log("something went wrong")

  }
  console.log("server started on port 8080");
});
