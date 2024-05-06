const jwt = require('jsonwebtoken');
const authKeys = require('./authKeys');
const { castObject } = require('../db/Admins');

const typeAuth = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized: No token provided' });
  }

  try {
    const decodedToken = jwt.verify(token, authKeys.jwtSecretKey);

    if(decodedToken.userType!='paid'){
        return res.status(403).json({message: 'Route accessible to paid users only'})
    }

    req.user = decodedToken

    next();
  } catch (error) {
    console.error('Error verifying token:', error);
    return res.status(401).json({ message: 'Unauthorized: Invalid token' });
  }
};

const isAdmin = (req,res,next)=>{
  const token = req.headers.authorization;

  if(!token){
    return res.status(401).json({message:'Unauthorized: No token provided'});
  }

  try{
    const decodedToken = jwt.verify(token, authKeys.jwtSecretKey)
  

  if(decodedToken.userType!='admin'){
    return res.status(403).json({message:'Route accessible only to admins'})
  }

  req.admin=decodedToken

  next()
}catch(error){
  console.error('Error verifying token:', error)
  return res.status(401).json({message:'Unauthorized: Invalid Token'})
}
}
module.exports = {typeAuth, isAdmin};