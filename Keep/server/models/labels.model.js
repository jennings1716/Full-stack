const mongoose = require("mongoose");
var labelSchema =  mongoose.Schema({
    userId:{
        type:String,
        required:"userId can\'t be empty",
    },
    labelId:{
        type:String,
        required:"labelId can\'t be empty",
    },
    labelName:{
        type:String,
         unique : true
    },
    noteIDs:[{
        type:String
    }]
});
 module.exports = mongoose.model('Label',labelSchema);