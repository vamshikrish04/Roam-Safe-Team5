const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const bookingSchema = new Schema ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_registration"
    },
    mechanicId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"mechanic"
    },
    userName:{
        type: String,

    },
    mechanicName :{
        type:String,
       
    },
    userMobileNo:{
        type:String
    },
  
     mechaicMobileNo:{
       type:String,
          dafault:''
     },
   
      service_needed:{
        type:String,
        default: false
    },
     userLocation:{
        type:Object
    },
    mechanicLocation:{
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
    amount:{
type:Number
        
    }

},{timestamps : true}
)

module.exports = mongoose.model("emergency_Booking" ,bookingSchema )