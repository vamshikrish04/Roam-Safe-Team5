const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const userSchema = new Schema ({
    first_name:{
        type: String,

    },
    last_name:{
      type: String,

  },
    userEmail:{
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
     type:{
      type:String
     },
   
      deleteFlag:{
        type:Boolean,
        default: false
    },
    location: {
      type: { type: String },
      coordinates: [Number],
    },
},{timestamps : true}
)
userSchema.index({ "location": "2dsphere" });

module.exports = mongoose.model("user_registration" , userSchema)