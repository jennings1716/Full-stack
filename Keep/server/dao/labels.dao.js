const mongoose = require("mongoose");
const Label = require("../models/labels.model")

module.exports.getLabels = (req,res,next)=>{
    console.log("get request body in labels",req.params);
    Label.find({userId:req.params.id},(err,data)=>{
        if(err){
            console.log("Labels err",err)
        }
        if(data){
            res.status(200).send(data)
        }
    })
}

module.exports.postLabels = (req,res,next)=>{
    console.log("post request body in labels",req.body)
    var new_label = new Label(req.body);
    new_label.save((err,data)=>{
        if(err){
            console.log("err",err)
        }
        if(data){

            res.status(201).send({"message":"saved Label",
                                "label":data})
        }
    })
}

module.exports.putLabels = (req,res,next)=>{
    var i=0;
    console.log("put request body in labels",req.body)
    var labelData = req.body
    labelData.forEach(lData=>{
         var query = {labelId:lData.labelId}
         var new_val = {$set:{noteIDs:lData.noteIDs}}
         Label.updateOne(query,new_val,(err,data)=>{
            if(data){
                i+=1
                console.log("data",data)
                if(i==req.body.length){
                    res.send({"message":"updates in labels table"})
                }
            }
            if(err){
                console.log("Error in updating noteID in label",err)
            }
            
         })
    })
}

module.exports.deleteLabels = (req,res,next)=>{
    var query = {labelId:req.body.labelId}
    console.log("req.body.labelId",req.body.labelId)
    Label.remove(query,(err,data)=>{
        if(data){
            res.status(201).send(req.body)
        }
        if(err){
            console.log("delete labels function",err)
        }
    })
}