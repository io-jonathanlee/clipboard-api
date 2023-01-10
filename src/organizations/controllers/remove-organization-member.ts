import {RemoveOrganizationMemberFunction} from '../types/remove-organization-member';
import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';

export const makeRemoveOrganizationMemberController = (
    removeOrganizationMember: RemoveOrganizationMemberFunction,
): HttpController => {
  return async function removeOrganizationMemberController(httpRequest: HttpRequest) {
    const removeOrganizationMemberContainer = await removeOrganizationMember(
        httpRequest.user,
        httpRequest.params.organizationId,
        httpRequest.body.memberEmailToRemove,
    );
    return {
      httpStatus: removeOrganizationMemberContainer.status,
      jsonBody: removeOrganizationMemberContainer.data,
    };
  };
};
