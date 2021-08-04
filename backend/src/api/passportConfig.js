
import mongoose from 'mongoose';
import passport from 'passport';
import {Strategy as LocalStrategy} from 'passport-local';

import {Users} from '../data/schema.js';
import {Strategy as JWTStrategy} from 'passport-jwt';
import { ExtractJwt } from 'passport-jwt';


passport.use(
  'login',
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]',
    },
    async (email, password, done) => {
      try {
        const user = await Users.create({ email, password });
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);

passport.use(
  'signup',
  new LocalStrategy(
    {
      usernameField: 'user[email]',
      passwordField: 'user[password]'
    },
    async (email, password, done) => {
      try {
        const user = await Users.create({ email, password });
        user.setPassword(password);
        return done(null, user);
      } catch (error) {
        done(error);
      }
    }
  )
);


passport.use(
  new JWTStrategy(
    {
      secretOrKey: 'TOP_SECRET',
      jwtFromRequest: ExtractJwt.fromUrlQueryParameter('secret_token')
    },
    async (token, done) => {
      try {
        return done(null, token.user);
      } catch (error) {
        done(error);
      }
    }
  )
);

export {};