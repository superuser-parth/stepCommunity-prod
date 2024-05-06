const express = require('express');
const jwt = require("jsonwebtoken");
const mongoose = require('mongoose');
const Job=require('../db/Jobs')
const authKeys=require('../lib/authKeys');
const { findById } = require('../db/Users');
const jwtAuth=require('../lib/jwtAuth')
const User = require('../db/Users');
const Product = require('../db/Products');
const {typeAuth}=require('../lib/typeAuth');

const router = express.Router();
router.use = express.json();

router.post('/addJob',jwtAuth,async (req, res) => {
  try {
      const token = req.headers.authorization;
      if (!token) {
          return res.status(401).json({ message: 'Authorization token missing' });
      }

      const decoded = jwt.verify(token, authKeys.jwtSecretKey);
      const userId = decoded.userId;
      const userJobsCount = await Job.countDocuments({ userId: userId });

      const newJob = new Job({
          title: req.body.title,
          description: req.body.description,
          about: req.body.about,
          skillsRequired: req.body.skillsRequired,
          location: req.body.location,
          contactInformation: req.body.contactInformation,
          userId: userId,
          jobType: req.body.jobType,
          salary: req.body.salary, 
          stipend: req.body.stipend, 
          duration: req.body.duration, 
      });

      const errors = newJob.validateSync();
      if (errors) {
          const validationErrors = Object.values(errors.errors).map(err => err.message);
          return res.status(400).json({ message: validationErrors });
      }

      if(userJobsCount<=2 || decoded.userType==='paid')
     { 
      const savedJob = await newJob.save();
      res.status(201).json({ message: 'Job added successfully', savedJob });
    }else{
      res.status(403).json({message:'Only 2 job postings allowed for free tier users'});
    }
  } catch (error) {
      console.error('Error adding job:', error);
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
          return res.status(401).json({ message: 'Invalid or expired token' });
      }
      res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.get('/getJobs',jwtAuth, typeAuth, async(req,res)=>{
    try{
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, authKeys.jwtSecretKey);
        const userId = decodedToken.userId;

        const user = User.findById(userId)
        if(user){
            const jobs = await Job.find({})
            res.status(200).json(jobs)
        }else{
            res.status(404).json({message:'Not a valid request'});
        }
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal server error'})
    }
})


router.get('/getUser',jwtAuth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, authKeys.jwtSecretKey);
    const userId = decodedToken.userId;

    const user = await User.findById(userId); // Wait for the database query to complete

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  }
});


router.put('/editProfile', jwtAuth, async (req, res) => {
  try {
    const token = req.headers.authorization;
    const decodedToken = jwt.verify(token, authKeys.jwtSecretKey);
    const userId = decodedToken.userId;

    const updatedUser=req.body;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    Object.assign(user, updatedUser);
    await user.save();

    return res.status(200).json({ message: 'User profile updated successfully' });
  } catch (error) {
    console.error('Error editing profile:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

router.put('/editJob/:id', jwtAuth, async(req,res)=>{
  try{
      const jobId = req.params.id;
      const updatedJob=req.body;

      const job = await Job.findById(jobId);
      if(!job){
        return res.status(404).json({message:'Job not found'})
      }

      Object.assign(job, updatedJob);
      await job.save();

      return res.status(200).json({message:'Job updated succesfully'})
  }catch(error){
    console.error('Error updating job info', error)
    return res.status(500).json({message:'Internal Server Error'})
  }
})




router.get('/byMe',jwtAuth, async(req,res)=>{
    try{

        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, authKeys.jwtSecretKey);
        const userId = decodedToken.userId;

        const jobs = await Job.find({ userId });
      
        res.status(200).json(jobs);
    }catch(err){
        console.error(err);
        res.status(500).json({message:'Internal server error'})
    }
})

router.get('/job-details/:id',jwtAuth, async(req,res)=>{
  try{
    const jobId = req.params.id;

    const job=await Job.findById(jobId);
    if(!job){
      return res.status(404).json({message:'Job not found'})
    }
    
    return res.status(200).json(job)

  }catch(error){
    console.log('Error fetching job', error);
    res.status(500).json({message:'Internal Server Error'})
  }
})

  

  router.delete('/deletejob/:id', jwtAuth, async (req, res) => {
    try {
      const jobId = req.params.id;
  
      // Check if the job exists
      const job = await Job.findById(jobId);
      if (!job) {
        return res.status(404).json({ message: 'Job not found' });
      }
  
      // Delete the job
      await job.deleteOne();
  
      res.status(200).json({ message: 'Job deleted successfully' });
    } catch (error) {
      console.error('Error deleting job:', error);
      res.status(500).json({ message: 'Internal server error' });
    }
  });


//Get applicants
    router.get('/getApplicants', jwtAuth, typeAuth, async (req, res) => {
      try {
        const users = await User.find({ "visible": true });
        if (users.length > 0) {
          res.status(200).json(users);
        } else {
          res.status(404).json({ message: 'No users found' });
        }
      } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      }
    });





  //Limited Access Routes for free Users

  //Allow browsing based on skills alone
  router.get('/getJobsBySkill', jwtAuth, async (req, res) => {
    try {
        const token = req.headers.authorization;
        const decodedToken = jwt.verify(token, authKeys.jwtSecretKey);
        const userId = decodedToken.userId;

        // Find user by userId
        const user = await User.findById(userId);
        if (user) {
            // Get the user's skills
            const userSkills = user.skills;

            // Find jobs that have at least one matching skillRequired field
            const jobs = await Job.find({ skillsRequired: { $in: userSkills } });
            res.status(200).json(jobs);

        } else {
            res.status(404).json({ message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

router.get('/getProducts',jwtAuth, async(req,res)=>{
  try{
      const products = await Product.find({})
      return res.status(200).json(products)
  }catch(error){
      console.error(error)
      return res.status(500).json({message:'Internal Server Error'})
  }
})


module.exports=router;