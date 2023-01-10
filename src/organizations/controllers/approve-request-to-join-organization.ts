import {ApproveRequestToJoinOrganizationFunction} from '../types/approve-request-to-join-organization';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeApproveRequestToJoinOrganizationController = (
    approveRequestToJoinOrganization: ApproveRequestToJoinOrganizationFunction,
): HttpController => {
  return async function approveRequestToJoinOrganizationController(httpRequest: HttpRequest) {
    const approveRequestToJoinOrganizationContainer = await approveRequestToJoinOrganization(
        httpRequest.user,
        httpRequest.params.requestToJoinOrganizationId,
    );
    return {
      httpStatus: approveRequestToJoinOrganizationContainer.status,
      jsonBody: approveRequestToJoinOrganizationContainer.data,
    };
  };
};
