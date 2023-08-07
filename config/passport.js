const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const path = require('path');
const db = require(path.join(__dirname, '../models'));
const bcrypt = require('bcrypt');

passport.use(
  new LocalStrategy(
    {
      usernameField: "username", // Corrected to "username"
    },
    (username, password, done) => {
      db.User.findOne({
        where: {
          username: username, // Corrected to "username"
        },
      }).then((dbUser) => {
        if (!dbUser) {
          return done(null, false, {
            message: "Incorrect username.",
          });
        } else if (!dbUser.validPassword(password)) {
          return done(null, false, {
            message: "Incorrect password.",
          });
        }
        return done(null, dbUser);
      });
    }
  )
);

passport.serializeUser((user, cb) => {
  cb(null, user);
});

passport.deserializeUser((obj, cb) => {
  cb(null, obj);
});

module.exports = passport;
