const mongoose = require("mongoose")
const {Schema}= mongoose;

const createEmployee = new Schema({
  first_name:{
    type:String,
    required:true,
  },
  last_name:{
    type:String,
    required:true,
  },
  DOB:{
    type: String,
    required:true,
  },
  start_date:{
    type: String,
    required:true,
  },
  end_date:{
    type: String,
    required:true,
  },
  study:{
    type:String,
    required:true,
  },
  salary:{
    type:Number,
    required:true,
  },
  description:{
    type:String,
    required:true,
  },

})

module.exports = mongoose.model("employee",createEmployee)