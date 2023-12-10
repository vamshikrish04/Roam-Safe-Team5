const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const carSchema = new Schema ({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user_registration"
    },
    car_brand:{
        type: String,

    },
    car_model:{
        type:String,
        required: true,
      
    },
    car_mileage:{
        type:String
    },
  
    previous_record:{
       type:String,
          dafault:''
     },
   
    
},{timestamps : true}
)

module.exports = mongoose.model("Car" , carSchema)