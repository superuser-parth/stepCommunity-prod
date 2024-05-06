const mongoose = require('mongoose');

// Define the admin schema
const adminSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: true,
    validate: {
      validator: function(value) {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
      },
      message: props => `${props.value} is not a valid email address`
    }
  },
  password: {
    type: String,
    required: true,
  },
  userType:{
    type:String,
    required:true,
    default:'admin'
  }

});

// Create the User model
const Admin = mongoose.model('Admin', adminSchema);

module.exports = Admin;
