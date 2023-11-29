const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const contactSchema = mongoose.Schema({
    name : {
      type:String,

    },
    mobile_no:{
        type:String
    },
    email:{
        type:String
   
    },
    message:{
        type:String
  
    }
    
},{timestamps : true})

module.exports = mongoose.model("contact", contactSchema)