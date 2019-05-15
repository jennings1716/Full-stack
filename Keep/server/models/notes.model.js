const mongoose = require("mongoose");
const Label = require("./labels.model")
let states = ["started", "not-started", "completed"]

var noteSchema =  mongoose.Schema({
    userId:{
        type:String,
        required:"userId can\'t be empty",
    },
    noteId:{
        type:String,
        required:"id can\'t be empty"
    },
    title:{
        type:String,
        required:"title can\'t be empty",
        
    },
    text:{
        type:String,
        
    },
    state:{
        type:String,
        enum:states,
        default:'not-started'
    },
    favorite:{
        type:Boolean,
        default:false
    },
    reminder:{
        type:Date
    },
    reminder_job:{
        type:Object
    },
    sharedTo:[{
        type:String
    }],
    // ,
    // labels:[
    //     {
    //         _id:{
    //             type:String
    //         },
    //         _v:{
    //             type:Number
    //         },
    //         userId:{
    //             type:String,
    //         },
    //         labelId:{
    //             type:String,
    //         },
    //         labelName:{
    //             type:String,
    //         },
    //         noteIDs:[{
    //             type:String
    //         }]
    //     }
    //  ]
});

 module.exports = mongoose.model('Note',noteSchema);