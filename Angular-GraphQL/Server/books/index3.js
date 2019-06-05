var express = require("express");
var app = express();
var mongoose = require("mongoose");
const bookSchema = require('./BookSchema').BookSchema;

mongoose.connect("mongodb://localhost:27017/graphtest",(err)=>{
    if(err)
    console.log("Connection succeeded");
})

app.use('/graphql', graphqlExpress({
    schema: bookSchema,
    rootValue: global,
    graphiql: true
}));
app.listen(4000,()=>{
    console.log("Server is running");
})