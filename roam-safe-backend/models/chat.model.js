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
    text:{
        type: String,

    },
    type :{
        type:String,
       
    },
  

},{timestamps : true}
)

module.exports = mongoose.model("chat" , chatSchema)