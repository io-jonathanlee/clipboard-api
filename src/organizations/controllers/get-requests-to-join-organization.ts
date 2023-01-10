import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {GetRequestsToJoinOrganizationFunction} from '../types/get-requests-to-join-organization';

export const makeGetRequestsToJoinOrganizationController = (
    getRequestsToJoinOrganization: GetRequestsToJoinOrganizationFunction,
): HttpController => {
  return async function getRequestsToJoinOrganizationController(httpRequest: HttpRequest) {
    const requestsToJoinOrganizationContainer = await getRequestsToJoinOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: requestsToJoinOrganizationContainer.status,
      jsonBody: requestsToJoinOrganizationContainer.data,
    };
  };
};
