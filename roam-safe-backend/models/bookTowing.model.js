const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const bookingSchema = new Schema ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_registration"
    },
    towingId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"towing_provider"
    },
    userName:{
        type: String,

    },
    towingProviderName :{
        type:String,
       
    },
    userMobileNo:{
        type:String
    },
  
     towingProviderMobileNo:{
       type:String,
          dafault:''
     },
   
      towing_needed:{
        type:String,
        default: false
    },
     userLocation:{
        type:Object
    },
    towingProviderLocation:{
        type:Object,
    },
    booking_status:{
        type: Number,
        default: 0
    },
    description:{
        type:String
},
    car_model:{
        type:String,
 
    },
    distance:{
        type:Number
    },
    amount:{
        type:Number
    }

},{timestamps : true}
)

module.exports = mongoose.model("towing_Booking" ,bookingSchema )