const mongoose = require("mongoose");
const connection = require("../config/db"); 
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
    firstname : String,
    lastname :String,
    email : String,
    isVerified : Boolean,
    password : {
        type: String,
    },
    tokens :[
        {
            token:{
                type:   String,
                require : true
            }
        }
    ]
},{
    timestamps : true
});
userSchema.pre('save',function(next){
    var salt = bcrypt.genSaltSync(10);
    if(this.password && this.isModified('password')){
        this.password = bcrypt.hashSync(this.password,salt);
    }
    next();
})
userSchema.methods.getAuthToken =async function(data){
    let params = {
        id : this._id,
        firstname : this.firstname,
        lastname : this.lastname,
        email : this.email
    }
    const key =process.env.SECRETKEY;
    var tokenValue = jwt.sign(params, key);
    this.tokens = this.tokens.concat({token:tokenValue});
    await this.save();
    return tokenValue;
}
const User = mongoose.model("User",userSchema);
module.exports = User;