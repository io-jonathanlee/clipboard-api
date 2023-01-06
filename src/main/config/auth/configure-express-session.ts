import expressSession from 'express-session';

/**
 * Express Session configuration.
 */
export const configureExpressSession = () => expressSession({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
});
