const mongoose = require('mongoose');


const NameSchema = new mongoose.Schema({
    Email:{
        type: String,
       
      },
    Lastname:{
        type: String,
        
      },
    Firstname: {
        type: String,
       
      },
    Age: {
        type: String,
        
      },
}, {timestamps: true})




module.exports = mongoose.model('names', NameSchema)
