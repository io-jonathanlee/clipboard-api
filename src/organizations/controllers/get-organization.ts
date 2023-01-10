import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetOrganizationFunction} from '../types/get-organization';

export const makeGetOrganizationController = (
    getOrganization: GetOrganizationFunction,
): HttpController => {
  return async function createOrganizationController(httpRequest: HttpRequest) {
    const organizationContainer = await getOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: organizationContainer.status,
      jsonBody: organizationContainer.data,
    };
  };
};
