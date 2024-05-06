const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true, 
    ref: 'User' 
  },
 
  jobType: {
    type: String,
    enum:['Internship', 'Full-Time'] 
    },
  salary:{
    type: Number,
  },
  stipend:{
    type:Number
  },
  duration:{
    type: Number,
  },  
  description: {
    type: String,
    required: true
  },
  about:{
    type: String,
    required: true
  },
  skillsRequired: {
    type: [{  
      type: String,
      enum:  ['Web dev', 'Digital Marketing', 'Phone Marketing', 'Data Analytics', 'Copywriting']
    }],
    required: true
  },
  location: {
    type: String,
    required: true
  },
  contactInformation: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },

});

// Create the Job model
const Job = mongoose.model('Job', jobSchema);

module.exports = Job;
