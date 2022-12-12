const jwt = require("jsonwebtoken");
const AuthModel = require("../models/auth.js");

// const authentication = (req, res, next) => {
//     if(!req.headers.token) return res.status(401).send({msg: "please login."});

//     jwt.verify(req.headers.token,"secretcode1234", (err, decoded) => {
//         if(err){
//             res.status(401).send({msg: "please login."});
//         }else{
//             req.body.userId = decoded.userId;
//             next();
//         }
//     })
// };
const authentication = (req, res, next) => {
  const token = req.headers?.authorization?.split(" ")[1];

  if (!token) {
    res.send("Please Login");
  }
  const decoded = jwt.verify(token, "secretcode1234");
  const user_id = decoded.user_id;
  if (decoded) {
    req.body.user_id = user_id;
    next();
  } else {
    res.send("Please Login");
  }
};

module.exports = { authentication };
