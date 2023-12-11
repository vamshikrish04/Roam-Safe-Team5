const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const cardSchema = mongoose.Schema({
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
    },
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_registration"
    },
    mechanicId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"mechanic"
    },
    towingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"towing_provider"
    },
 card_number:{
    type:String
 },
 userName:{
type:String
 },
 mechanicName:{
    type:String
 },
 towingName:{
    type:String

 },
 expire_date:{
type:String
 },
 cvv:{
    type:String
 },
 amount:{
    type:Number
 }
},{
    timeStamps:true
})

module.exports = mongoose.model("card", cardSchema)