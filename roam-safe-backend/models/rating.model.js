const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const ratingSchema = mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_registration"
    },
    mechanicId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"mechanic"
    },
    bookingId :{
        type: mongoose.Schema.Types.ObjectId,
        ref:"Book_Mechanic"
    },

    towingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"towing_provider"
    },
    rating:{
        type:Number
    },
    review:{
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
    }
},{
    timeStamps:true
})

module.exports = mongoose.model("rating", ratingSchema)