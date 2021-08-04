import passport from 'passport';
import express from 'express';
import auth from '../auth.js';
import {Users} from '../../data/schema.js';
import {} from '../passportConfig.js';
const userRouter = express.Router();

//POST new user route (optional, everyone has access)
userRouter.post('/', auth.optional, (req, res, next) => {
  const user = req.body.user;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }

  const finalUser = new Users(user);

  finalUser.setPassword(user.password);

  return finalUser.save()
    .then(() => res.json({ user: finalUser.toAuthJSON() }));
});

//POST login route (optional, everyone has access)
// userRouter.post('/login', auth.optional, (req, res, next) => {
//   const { body: { user } } = req;
//   console.log(user);
//   if(!user.email) {
//     return res.status(422).json({
//       errors: {
//         email: 'is required',
//       },
//     });
//   }

//   if(!user.password) {
//     return res.status(422).json({
//       errors: {
//         password: 'is required',
//       },
//     });
//   }

//   return passport.authenticate('local', { session: false, failureRedirect: '/auth/login'}, (err, passportUser, info) => {
//     if(err) {
//       return next(err);
//     }

//     if(passportUser) {
//       const user = passportUser;
//       user.token = passportUser.generateJWT();
//       console.log('yee');
//       return res.json({user: user.toAuthJSON()});
//     }
//     console.log('haw')
//     return res.status(400).info;
//   })(req, res, next);
// });

userRouter.post(
  '/login',
  async (req, res, next) => {
    passport.authenticate(
      'login',
      async (err, user, info) => {
        try {
          if (err || !user) {
            const error = new Error('An error occurred.');

            return next(error);
          }

          req.login(
            user,
            { session: false },
            async (error) => {
              if (error) return next(error);

              const body = { _id: user._id, email: user.email };
              const token = jwt.sign({ user: body }, 'TOP_SECRET');

              return res.json({ token });
            }
          );
        } catch (error) {
          return next(error);
        }
      }
    )(req, res, next);
  }
);

//GET current route (required, only authenticated users have access)
userRouter.get('/current', auth.required, (req, res, next) => {
  const { payload: { id } } = req;

  return Users.findById(id)
    .then((user) => {
      if(!user) {
        return res.sendStatus(400);
      }
      return res.json({ user: user.toAuthJSON() });
    }).catch((err) => {
        return res.json({err: err.message});
    });
});

export default userRouter;