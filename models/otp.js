const mongoose = require("mongoose");
const connection = require("../config/db"); 

const otpSchema = new mongoose.Schema({
    email : String,
    code : Number,
    expiresIn : Number
},{
    timestamps : true
});

let otp = connection.model('otp',otpSchema,'otp');
module.exports = otp;
