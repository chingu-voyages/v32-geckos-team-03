const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user.model');

const localAuth = new LocalStrategy(
  { usernameField: 'email' },
  async function (email, password, done) {
    let user = await User.userForEmail(email);
    if (!user) return done(null, false);
    
    let validPassword = await user.comparePassword(password);
    if (!validPassword) return done(null, false);

    return done(null, user);
  }
);

module.exports = function(passport) {
  passport.use(localAuth);

  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });
};