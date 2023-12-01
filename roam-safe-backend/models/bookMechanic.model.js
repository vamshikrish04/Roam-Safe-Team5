const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const mechanicSchema = new Schema ({
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
   
      issue_in_car:{
        type:String,
        default: false
    },
    date:{
        type:String
    },
    time:{
        type:String
    },
    car_model:{
        type:String

    },
    booking_status:{
        type: Number,
        default: 0
    },
    amount:{
        type:Number
    }

},{timestamps : true}
)

module.exports = mongoose.model("Book_Mechanic" , mechanicSchema)