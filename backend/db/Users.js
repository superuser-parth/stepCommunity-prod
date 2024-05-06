const mongoose = require('mongoose');

// Define the user schema
const userSchema = new mongoose.Schema({
  fullName:{
    type:String,
    required: true,
    default:'firstName lastName'

  },
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
  visible:{
    type: Boolean,
    required:true,
    default:false
  },
  userType: {
    type: String,
    enum: ['free', 'paid'],
    required: true,
    default:'free' 
  },
  institute:{
    type:String,
    required:false,
    default:'N.A'
  },
  graduation:{
    type: Number,
    required: false,
    
  },
  
  skills: {
    type: [{
      type: String,
      enum:  ['Web dev', 'Digital Marketing', 'Phone Marketing', 'Data Analytics', 'Copywriting']
    }],
    required: true,
   
  },

});

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;
