const Users =  require("../models/users");
const Otp =  require("../models/otp");
const nodemailer = require("nodemailer");
const User = require("../models/users");
const userList =async function(req,res){
   let data = await Users.find();
   res.json(data);
}
const emailSend = async function(req,res){
    if(typeof req.body.email=="undefined"){
        req.body = JSON.parse(Object.keys(req.body)[0]);
    }
    const email = req.body.email;
    console.log(req.body);
    const responseType = {};
    let data = await Users.findOne({email : email});
    if(data){
        let generateOtp = Math.floor((Math.random()*10000)+1);
        let otpData= new Otp({
            email : email,
            code : generateOtp,
            expiresIn : new Date().getTime() + 300*1000
        })
        let otpResponse = await otpData.save();
        responseType.statusText = "Success";
        responseType.message = "Please check Your Email";

        console.log(generateOtp);
        const Response = await sendEmail(email,generateOtp);
        console.log(Response);
    } 
    else {
        responseType.statusText = "error";
        responseType.message = "Email Id not found";
    }
    res.status(200).json(responseType);
}
const getOtp = async function(req,res){
    if(typeof req.body.email=="undefined"){
        req.body = JSON.parse(Object.keys(req.body)[0]);
    }
    let data = await Otp.findOne({email : req.body.email,code : req.body.code});
    const response ={};
    if(data){
        let currentTime = new Date().getTime();
        let diff = data.expiresIn - currentTime;
        if(diff < 0){
            response.message = "OTP Expired";
            response.status = "Error";
        }
        else {
           let user = await  User.findOne({email : req.body.email});
           user.isVerified = true;
           user.save();
           response.message = "Email Id verified successfully";
            response.status = "ok";
        }
    }
    else{
        response.message = "Invalid Email";
        response.status = "Error";
    }
    res.status(200).json(response);
}
const userAdd = async function(req,res){
    if(typeof req.body.firstname=="undefined"){
        req.body = JSON.parse(Object.keys(req.body)[0]);
    }
    let response ={};
    let Res = {};
    let {firstname,lastname,email,password} =req.body;
    if(req.body.email=='' || req.body.password==''){
        response.message = "Email or password can't be empty";
        response.status = "error";
    }
    else {
        let data = new Users({
            firstname : firstname,
            lastname : lastname,
            email: email,
            isVerified : false,
            password: password
        });
        Res = await data.save();
        response.message = "You are registered successfully";
        response.status = "ok";
    }
    res.status(200).json({response,Res});
} 


const userLogin = async function(req,res){
    if(typeof req.body.email=="undefined"){
        req.body = JSON.parse(Object.keys(req.body)[0]);
    }
    console.log(req.body);
    let message ={};
    var statusCode =0 ;
    if(!req.body.email || !req.body.password){
        statusCode = 200;
        message.text ="Please enter your email and password";
        res.status(200).json(message);
    }
    else {
        let user = await Users.findOne({email : req.body.email});
   
        if(user){
            if(req.body.password === user.password){
                message.statusCode = 100;
                message.text = "Login Successfully";
            }
            else {
                message.statusCode = 101;
                message.text = "Wrong Password";
            }
        }
        else {
            message.statusCode = 201 ;
            message.text = "Invalid email ID";
        }
    }
    res.status(201).json(message);
}


"use strict";
const transporter = nodemailer.createTransport({
    service : "hotmail",
    auth :{
        user:"user@outlook.com",
        pass: "user@2000"
    }
});
async function sendEmail(email,code) {
    console.log(email);
    let message =  'Here is the OTP to verify your email id  '+ code;
  let info = await transporter.sendMail({
    from: 'krishnakumar10102000@outlook.com', 
    to: email, 
    subject: "OTP to Verify your email", 
    text: message, 
    html: "" 
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}
sendEmail().catch(console.error);

module.exports = {
    userList,
    userAdd,
    userLogin,
    emailSend,
    getOtp
}