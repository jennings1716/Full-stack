const express = require('express');
const app = express();
const mongoose = require('mongoose');
var graphQl = require("express-graphql");
const cors = require('cors')
const schema = require('./vehicleSchemaGQL');
app.use(cors())

app.get('/', (req, res)=>{
    res.end("graphql-vehicleshop is running on 3000 port...");
})

mongoose.connect(`mongodb://127.0.0.1/vehicledb`,()=>{
    console.log("Connected")
});
mongoose.connection.on('error', err => console.error('FAILED to connect to mongodb instance.', err));
mongoose.connection.once('open', () => console.log('Connected to mongodb instance.'));

app.use('/graphql', graphQl({
    schema,
    graphiql: true
}));

app.listen(3000, ()=>{
    console.log("Server is starting on 3000 port...");
});