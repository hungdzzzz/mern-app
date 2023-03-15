const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema(
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

module.exports = mongoose.model("User", UserSchema);
