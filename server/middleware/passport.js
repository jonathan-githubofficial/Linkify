const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const accountM = require("../models/accountModel");
const crypto = require("crypto");

module.exports = function (passport) {
  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: "/api/account/login/google/callback",
      },
      async (accessToken, refreshToken, profile, done) => {
        try {
          const existingUser = await accountM.findOne({ email: profile.emails[0].value });

          if (existingUser) {
            return done(null, existingUser);
          } else {
            const newUser = await accountM.create({
              name: profile.displayName,
              email: profile.emails[0].value,
              password: crypto.randomBytes(16).toString('hex'),
            });

            return done(null, newUser);
          }
        } catch (error) {
          return done(error, null);
        }
      }
    )
  );

  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    try {
      const user = await accountM.findById(id);
      done(null, user);
    } catch (error) {
      done(error, null);
    }
  });
};
