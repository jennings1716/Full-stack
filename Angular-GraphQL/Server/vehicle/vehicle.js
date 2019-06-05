var mongoose = require("mongoose");

var vehicle = new mongoose.Schema({
    carname:{
        type:String
    } ,
    year:{
        type:Number
    } ,
    transmission: {
        type:String
    } ,
    fuelType: {
        type:String
    } ,
    engineCapacity: {
        type:Number
    } 
});

module.exports = mongoose.model('Vehicle',vehicle);