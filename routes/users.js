const express  = require("express");
const app = express();
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({extended:true}));
const userCtrl = require("../controllers/userControllers");
const { route } = require("express/lib/application");
router.get("/users",function(req,res){
     res.send("Heellihd");
});

router.get("/list",userCtrl.userList);
router.post("/add",userCtrl.userAdd);
router.post("/login",userCtrl.userLogin);
router.post("/emailsend",userCtrl.emailSend);
router.post("/getotp",userCtrl.getOtp);
module.exports = router;