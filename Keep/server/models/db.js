const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/test_user",(err)=>{
    if(!err){
        console.log("Connection succeeded")
    }else{
        console.log("Error in connection",JSON.stringify(err,undefined,2))
    }
});
require('./notes.model');
require('./user.model');
require('./labels.model');