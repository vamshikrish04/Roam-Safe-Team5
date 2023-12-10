const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const objectSchema = new mongoose.Schema({
  serviceName: String,
  // Add other properties if needed
});

const mechanicSchema = new Schema ({
    name:{
        type: String,

    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    password:{
        type:String
    },
  
     phone_number:{
       type:String,
          dafault:''
     },
     company_name :{
     type:String
     },
     address:{ 
      type:String
    },
    service_provided:[objectSchema],
   
      deleteFlag:{
        type:Boolean,
        default: false
    },
    type:{
      type:String
     },
     document:{
type:String
     },
     licence:{
      type:String
     },
     store_paper:{
      type:String
     },
    verify_status:{
     type:Number,
     default: 0
    },
    location: {
      type: { type: String ,
        // default: 'Point',
      },
      coordinates: [Number],
    },
},{timestamps : true}
)
// mechanicSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model("mechanic" , mechanicSchema)