// passportConfig.js
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const bcrypt = require("bcryptjs");
const User = require("./models/user.model");

// Local Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: "login", // either username or email
      passwordField: "password",
    },
    async (login, password, done) => {
      try {
        // check if the login is an email
        let user;
        if (login.includes("@")) {
          user = await User.findOne({ email: login });
        } else {
          user = await User.findOne({ username: login });
        }

        if (!user) {
          return done(null, false, { message: "Incorrect username or email." });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return done(null, false, { message: "Incorrect password." });
        }

        return done(null, user);
      } catch (err) {
        return done(err);
      }
    }
  )
);

// Google Strategy
// passport.use(
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "/auth/google/callback",
//     },
//     async (token, tokenSecret, profile, done) => {
//       try {
//         let user = await User.findOne({
//           ssoId: profile.id,
//           ssoProvider: "google",
//         });
//         if (!user) {
//           user = new User({
//             email: profile.emails[0].value,
//             name: profile.displayName,
//             ssoId: profile.id,
//             ssoProvider: "google",
//             role: "customer",
//           });
//           await user.save();
//         }
//         return done(null, user);
//       } catch (err) {
//         return done(err);
//       }
//     }
//   )
// );

// Serialize user into session
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

module.exports = passport;
