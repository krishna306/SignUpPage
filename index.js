const express = require("express");
const app = express();
const ejs = require("ejs");
const path=require('path');
const userRoute = require("./routes/users");
app.set('view engine','ejs');
// app.use(express.static(path.join(__dirname,"/public")));
 
require('dotenv').config({
    path : path.join(__dirname,'.env')
})

const port =  process.env.PORT || 5000;
console.log(process.env.SECRETKEY);
app.use("/users",userRoute);

app.listen(port,function(){
    console.log("Server on 5000");
});