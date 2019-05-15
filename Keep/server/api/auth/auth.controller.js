const generateToken = require('./generateToken');
const verifyToken = require('./verifyToken');
const mongoose = require("mongoose");
const User = mongoose.model("User")

function register(req,res,next){
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    console.log("user",user)
    user.save((err,doc)=>{
        if(!err){
            return res.status(200).json(doc);
             
        }else{
            if(err.code){
                console.log("Duplication key error")
                return res.status(422).json({"message":"Duplication key error"});
            }else{
                return res.status(422).send({"message":"validation error"});
                 
            }
        }
    })
}

function authenticate(req, res, next) {
  const username = req.body.username;
  const password = req.body.password;
  User.findOne({"username":username},(err,user)=>{
    if(!user) { 
      res.status(403).json({message: 'Unauthorized'}); return; 
    }else if(user.password !== password) { 
      res.status(403).json({message: 'Unauthorized. Wrong password'}); return; 
    }else{
      // const scopes = users[username].scopes;
      generateToken(user._id, (err, token) => {
        console.log("error",err)
        if(err) { res.status(403).json({message: 'Unauthorized'}); return; }
        res.status(201).json({"token":token,
                              "userid":user._id
                            });
      });
    }
  })
}

function isAuthenticated(req, res, next) {
  const authorizationHeader = req.get('Authorization');
  if(!authorizationHeader) { res.status(200).json({isAuthenticated: false}); return; }

  const token = authorizationHeader.replace('Bearer ', '');
  verifyToken(token, (err) => {
    if(err) { res.status(200).json({isAuthenticated: false}); return; }
    else res.status(200).json({isAuthenticated: true}); return;
  })
}

function getAllUsers(req,res,next){
  User.find({},(err,data)=>{
    if(err){
      res.status(404).json({error:err});
    }
    if(data){
      res.status(200).json({users:data});
    }
  })
}
module.exports = {
  authenticate,
  isAuthenticated,
  register,
  getAllUsers
}
