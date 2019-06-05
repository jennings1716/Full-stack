var express =  require("express");
var graphQl = require("express-graphql");
var build = require("graphql").buildSchema;

var schema = build(`
           type Query {       
                message(name:String!): String
            }
`);//Query Mutation Subscription

var root = {
    message: (args)=>'Hello '+args.name
};

var app = express();

app.use('/graphql',graphQl({
    schema:schema,
    rootValue:root,
    graphiql:true
}));

app.listen(4000,()=>{
    console.log("server is running");
})