const mongoose = require('mongoose');

const AuthSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      unique: true,
    },
    lname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
    },
    
  },
  { timestamps: true }
);

module.exports = mongoose.model("Auth", AuthSchema);
