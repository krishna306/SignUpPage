const express  = require("express");
const app = express();
const router = express.Router();
var jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
const userCtrl = require("../controllers/userControllers");
const { route } = require("express/lib/application");
const { response } = require("express");
var jwtAuth = (req,res,next) =>{
     var token = req.headers.authorization;
     token = token.split(' ')[1];
     jwt.verify(token,process.env.SECRETKEY,function(err,decoded){
          if(err){
               res.send({message : "Invalid Token"});
          }
          else {
               next();
          }
     })
}
router.get("/users",function(req,res){
     res.send("Heellihd");
});
router.get("/list",jwtAuth,userCtrl.userList);
router.post("/add",userCtrl.userAdd);
router.post("/login",userCtrl.userLogin);
router.post("/emailsend",userCtrl.emailSend);
router.post("/getotp",userCtrl.getOtp);
module.exports = router;