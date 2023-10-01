const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const chatSchema = new Schema ({
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
    adminId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Admin"
    },
    username:{
        type:String
    },
    towingName:{
        type:String

    },
    mechanicName:{
        type:String
    },
    text:{
        type: String,

    },
    type :{
        type:String,
       
    },
  

},{timestamps : true}
)

module.exports = mongoose.model("admin_chat" , chatSchema)