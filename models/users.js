const mongoose = require("mongoose");
const connection = require("../config/db"); 

const userSchema = new mongoose.Schema({
    firstname : String,
    lastname :String,
    email : String,
    isVerified : Boolean,
    password : {
        type: String,
    }
},{
    timestamps : true
});

const User = mongoose.model("User",userSchema);
module.exports = User;