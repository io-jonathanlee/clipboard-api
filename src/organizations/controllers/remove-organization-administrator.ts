import {HttpController} from '../../main/types/http-controller';
import {HttpRequest} from '../../main/types/http-request';
import {RemoveOrganizationAdministratorFunction} from '../types/remove-organization-administrator';

export const makeRemoveOrganizationAdministratorController = (
    removeOrganizationAdministrator: RemoveOrganizationAdministratorFunction,
): HttpController => {
  return async function removeOrganizationAdministratorController(httpRequest: HttpRequest) {
    const removeOrganizationAdministratorContainer = await removeOrganizationAdministrator(
        httpRequest.user,
        httpRequest.params.organizationId,
        httpRequest.body.administratorEmailToRemove,
    );
    return {
      httpStatus: removeOrganizationAdministratorContainer.status,
      jsonBody: removeOrganizationAdministratorContainer.data,
    };
  };
};
