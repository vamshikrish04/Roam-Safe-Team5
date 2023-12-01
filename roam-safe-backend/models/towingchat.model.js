const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const chatSchema = new Schema ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_registration"
    },
    towingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"towing_provider"
    },
    text:{
        type: String,

    },
    type :{
        type:String,
       
    },
  

},{timestamps : true}
)

module.exports = mongoose.model("towing_chat" , chatSchema)