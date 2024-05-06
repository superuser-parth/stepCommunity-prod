const express = require("express");
const jwt = require("jsonwebtoken");
const authKeys = require("../lib/authKeys");
const User = require("../db/Users.js");
const Admin = require ("../db/Admins.js")
const { hashPassword, comparePasswords } = require("../lib/passwordUtil");
const router = express.Router();

router.post('/signup', async(req, res)=>{
    const data= req.body;

    try{

        const existingUser = await User.findOne({email:data.email});
        if(existingUser){
            return res.status(400).json({message:'User already exists'});
        }

        const hashed = await hashPassword(data.password)

        let user = new User({
            email: data.email,
            password: hashed,
            userType: data.userType,
            skills: data.skills,
        });

        await user.save();

        const token = jwt.sign({userId: user._id, userType: user.userType}, authKeys.jwtSecretKey,{
            expiresIn:'3h'
        });

        res.status(201).json({message:'User added to DB', token});
        


    }catch(error){
        console.log('Error signing up the user', error);
        res.status(500).json({message:'Internal server error'});
    }
})

router.post('/login', async(req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email })
        
        if (user) {
            const passwordMatch = await comparePasswords(password, user.password);
            if (passwordMatch) {
                const token = jwt.sign({ userId: user._id, userType: user.userType }, authKeys.jwtSecretKey,{
                    expiresIn:'20s'
                });
                return res.status(200).json({ message: 'Logged in Successfully', token });
            }
        }

        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});

/*router.post('/adminsignup', async(req, res)=>{
    const data= req.body;

    try{
        const hashed = await hashPassword(data.password)

        let admin = new Admin({
            email: data.email,
            password: hashed,
        });

        await admin.save();


        res.status(201).json({message:'User added to DB'});
        


    }catch(error){
        console.log('Error signing up the admin', error);
        res.status(500).json({message:'Internal server error'});
    }
})*/

router.post('/adminLogin', async(req, res) => {
    const { email, password } = req.body;

    try {
        const admin = await Admin.findOne({ email })
        
        if (admin) {
            
            const passwordMatch = await comparePasswords(password, admin.password);
            if (passwordMatch) {
                const token = jwt.sign({ adminId: admin._id, userType:admin.userType}, authKeys.jwtSecretKey,{
                    expiresIn:'3h'
                });
                return res.status(200).json({ message: 'Logged in Successfully', token });
            }
        }

        return res.status(401).json({ message: 'Invalid email or password' });
    } catch (error) {
        console.error('Error during login:', error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
});


module.exports=router;