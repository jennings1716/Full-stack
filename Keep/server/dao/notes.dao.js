const mongoose = require("mongoose");
const Note = require("../models/notes.model")


module.exports.getNotes = (req,res,next)=>{
    console.log("req quer",req.params.id)
    Note.find({ $or:[{userId:req.params.id},{sharedTo:req.params.id}]},(err,data)=>{
        if(err){
            console.log("Notes err",err);
        }
        if(data){
            res.status(200).send(data);
        }
    })
}

module.exports.postNotes = (req,res,next)=>{
    console.log("post notes function")
    var new_note = new Note(req.body)
    console.log("req.body",req.body)
    new_note.save((err,data)=>{
        if(err){            
            res.status(400).send({"message":"Request body invalid"})
    
        }
        if(data){
            console.log(data);
            res.status(201).send({"message":"saved the note"})
        }
    })
}

module.exports.putNotes = (req,res,next)=>{
    var query = {userId:req.body.userId,noteId:req.body.noteId}
    var new_val = {$set:{text:req.body.text,title:req.body.title,state:req.body.state,favorite:req.body.favorite,reminder:req.body.reminder,
                        reminder_job:req.body.reminder_job}}
    Note.updateOne(query,new_val,(err,data)=>{
        if(data){
            res.status(201).send({"message":"updated note","note":req.body})
        }
        if(err){
            console.log("put notes error",err)
        }
        
    })
}

module.exports.updateMultipleNotes = (req,res,next)=>{
    console.log("req.body",req.body);
    let notes = req.body;
    let count = 0;
    notes.forEach(note=>{
        var query = {userId:note.userId,noteId:note.noteId}
        var new_val = {$set:{sharedTo:note.sharedTo,favorite:note.favorite}}
        Note.updateOne(query,new_val,(err,data)=>{
            if(data){
                count+=1;
                if(count==notes.length){
                    res.status(201).send({"message":"updated note","note":data})
                }
            }
            if(err){
                console.log("put notes error",err)
            }
            
        })
        
    })
}

module.exports.putReminderNotes = (id,date)=>{
    var query = {noteId:id}
    var new_val = {$set:{reminder:date}}
    return new Promise(()=>{
        Note.updateOne(query,new_val,(err,data)=>{
            if(data){
                resolve(data)
            }
            if(err){
                reject(err)
            }
        
        })
    })
    
}

module.exports.deleteNotes = (req,res,next)=>{
    var notes = req.body.notes
    var length = notes.length
    var i=0
    notes.forEach(note=>{
        var query = {noteId:note.noteId}
        Note.remove(query,(err,data)=>{
            if(data){
                i+=1
                if(i==length){
                    res.status(201).send(notes)
                }
                console.log("delete notes function",data)
            }else{
                console.log("delete notes function",err)
            }
        })
    })
}


