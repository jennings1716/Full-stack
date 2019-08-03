let express = require("express");
var bodyParser = require('body-parser'); 
let app = express();
let posts = [
    {
        title:"one"
    }
];
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header(  'Content-Type' ,'application/json');
    res.header("Access-Control-Allow-Methods", "POST, GET");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  })
app.use(bodyParser.json()); 
app.get("/posts",(req,res,next)=>{
    res.send(posts);
});
app.post("/posts",(req,res,next)=>{
    console.log("req",req.body); 
    posts.push(req.body);
    res.header('Content-Type', 'application/json');
    res.send(req.body)
});

app.listen(3100,()=>{
    console.log("Server running")
});
