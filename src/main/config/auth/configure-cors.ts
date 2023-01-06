import cors from 'cors';

/**
 * CORS configuration.
 */
export const configureCors = () => {
  return cors({
    credentials: true,
    origin: process.env.FRONT_END_URL,
  });
};
