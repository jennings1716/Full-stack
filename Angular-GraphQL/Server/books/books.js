var mongoose = require("mongoose");

var BookSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    author:{
        type:String,
        required:true
    }
});
module.exports  = mongoose.model('book', BookSchema);
