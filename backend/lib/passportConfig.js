// Import necessary modules
const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const jwt = require('jsonwebtoken');


const User = require('../db/Users');

passport.use(new JwtStrategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'toodamnsecret',
}, async (jwtPayload, done) => {
  try {

    const user = await User.findById(jwtPayload.sub);

    if (user) {
      return done(null, user);
    } else {
      return done(null, false);
    }
  } catch (error) {
    return done(error, false);
  }
}));

function generateToken(user) {
  const payload = {
    sub: user.id,

  };
  return jwt.sign(payload, 'toodamnsecret', { expiresIn: '1h' }); 
}

module.exports = { passport, generateToken };
