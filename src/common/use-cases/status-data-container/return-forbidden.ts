import {ReturnForbiddenFunction} from './types/return-forbidden';

/**
 * Helper function for returning HTTP 403 Forbidden errors.
 */
export const makeReturnForbidden = (): ReturnForbiddenFunction => {
  return function() {
    return {
      status: 403,
      data: undefined,
    };
  };
};
