
import mongoose from 'mongoose';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import {Users} from '../data/schema.js';

passport.use("local", new LocalStrategy({
  usernameField: 'user[email]',
  passwordField: 'user[password]',
}, (email, password, done) => {
   Users.findOne({ email })
    .then((user) => {
      if(!user || !user.validatePassword(password)) {
        return done(null, false, { errors: { 'email or password': 'is invalid' } });
      }

      return done(null, user);
    }).catch(done);
}));

export {};