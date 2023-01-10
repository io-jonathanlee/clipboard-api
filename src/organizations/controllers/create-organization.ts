import {CreateOrganizationFunction} from '../types/create-organization';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeCreateOrganizationController = (
    createOrganization: CreateOrganizationFunction,
): HttpController => {
  return async function createOrganizationController(httpRequest: HttpRequest) {
    const organizationContainer = await createOrganization(
        httpRequest.user,
        httpRequest.body.name,
    );
    return {
      httpStatus: organizationContainer.status,
      jsonBody: organizationContainer.data,
    };
  };
};
