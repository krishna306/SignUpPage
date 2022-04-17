const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/USERSDB",{
    useNewUrlParser : true
}).then(function(){
    console.log("Connected to Database");
}).catch(function(err){
    console.log(err);
});

module.exports = mongoose;