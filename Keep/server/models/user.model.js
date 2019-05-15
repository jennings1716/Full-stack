const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:"full name can\'t be empty",
        unique:true
    },
    password:{
        type:String,
        required:"Email can\'t be empty"
    }
});
module.exports = mongoose.model('User',userSchema);