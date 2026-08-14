import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/User.js';

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;

        // First check by googleId
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // Check if a user already exists with this email (e.g. registered via password)
          user = await User.findOne({ email });

          if (user) {
            // Link the Google account to the existing user
            user.googleId = profile.id;
            if (!user.avatarUrl) user.avatarUrl = profile.photos[0]?.value;
            await user.save();
          } else {
            // Brand new user — create an account
            user = await User.create({
              googleId: profile.id,
              email,
              fullName: profile.displayName,
              avatarUrl: profile.photos[0]?.value,
              role: 'farmer',
            });
          }
        }

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;
