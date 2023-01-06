import {Router} from 'express';

/**
 * Configuration for the user logout route.
 * @param router Express router to be configured
 * @param path path at which the endpoint is to be set
 */
export const configureLogoutRoute = (
    router: Router,
    path: string,
) => {
  router.post(path, (req, res, _next) => {
    req.logout((err) => {
      if (err) {
        console.error(`An error has occurred: ${err}`);
        return res.status(500).json({logout_status: 'FAILURE'});
      }
    });
    return res.status(200).json({logout_status: 'SUCCESS'});
  });
};
