const mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.ObjectId;
var aggregatePaginate = require("mongoose-aggregate-paginate-v2");

const modelSchema = mongoose.Schema({
    modelName : {
      type:String,

    },
    
},{timestamps : true})

module.exports = mongoose.model("model", modelSchema)