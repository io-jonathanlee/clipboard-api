import {makeCreateOrganizationController} from './create-organization';
import {
  approveRequestToJoinOrganization,
  createOrganization,
  getOrganization,
  getRequestsToJoinOrganization,
  removeOrganizationAdministrator,
  removeOrganizationMember,
  requestToJoinOrganization,
} from '../services';
import {makeGetOrganizationController} from './get-organization';
import {makeRequestToJoinOrganizationController} from './request-to-join-organization';
import {makeGetRequestsToJoinOrganizationController} from './get-requests-to-join-organization';
import {makeRemoveOrganizationMemberController} from './remove-organization-member';
import {makeApproveRequestToJoinOrganizationController} from './approve-request-to-join-organization';
import {makeRemoveOrganizationAdministratorController} from './remove-organization-administrator';

export const createOrganizationController = makeCreateOrganizationController(createOrganization);

export const getOrganizationController = makeGetOrganizationController(getOrganization);

export const removeOrganizationAdministratorController =
    makeRemoveOrganizationAdministratorController(removeOrganizationAdministrator);

export const removeOrganizationMemberController = makeRemoveOrganizationMemberController(removeOrganizationMember);

export const getRequestsToJoinOrganizationController =
    makeGetRequestsToJoinOrganizationController(getRequestsToJoinOrganization);

export const requestToJoinOrganizationController = makeRequestToJoinOrganizationController(requestToJoinOrganization);

export const approveRequestToJoinOrganizationController =
    makeApproveRequestToJoinOrganizationController(approveRequestToJoinOrganization);
