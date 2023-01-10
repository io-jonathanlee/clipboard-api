import {RequestToJoinOrganizationFunction} from '../types/request-to-join-organization';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeRequestToJoinOrganizationController = (
    requestToJoinOrganization: RequestToJoinOrganizationFunction,
): HttpController => {
  return async function requestToJoinOrganizationController(httpRequest: HttpRequest) {
    const requestToJoinOrganizationContainer = await requestToJoinOrganization(
        httpRequest.user,
        httpRequest.params.organizationId,
    );
    return {
      httpStatus: requestToJoinOrganizationContainer.status,
      jsonBody: requestToJoinOrganizationContainer.data,
    };
  };
};
