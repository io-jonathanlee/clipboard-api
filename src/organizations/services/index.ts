import {loggerConfig} from '../../main/config/logger/logger-config';
import {makeCreateOrganization} from './create-organization';
import {generatedId} from '../../util/id/services';
import {OrganizationModel} from '../models/Organization';
import {makeGetOrganization} from './get-organization';
import {makeRequestToJoinOrganization} from './request-to-join-organization';
import {OrganizationMembershipRequestModel} from '../models/OrganizationMembershipRequest';
import {makeGetRequestsToJoinOrganization} from './get-requests-to-join-organization';
import {makeRemoveOrganizationMember} from './remove-organization-member';
import {makeApproveRequestToJoinOrganization} from './approve-request-to-join-organization';
import {makeRemoveOrganizationAdministrator} from './remove-organization-administrator';

const logger = loggerConfig();

export const getOrganization = makeGetOrganization(
    logger,
    OrganizationModel,
);

export const createOrganization = makeCreateOrganization(
    logger,
    generatedId,
    OrganizationModel,
);

export const removeOrganizationAdministrator = makeRemoveOrganizationAdministrator(
    logger,
    OrganizationModel,
);

export const removeOrganizationMember = makeRemoveOrganizationMember(
    logger,
    OrganizationModel,
);

export const getRequestsToJoinOrganization = makeGetRequestsToJoinOrganization(
    logger,
    OrganizationModel,
    OrganizationMembershipRequestModel,
);

export const requestToJoinOrganization = makeRequestToJoinOrganization(
    logger,
    OrganizationModel,
    OrganizationMembershipRequestModel,
    generatedId,
);

export const approveRequestToJoinOrganization = makeApproveRequestToJoinOrganization(
    logger,
    OrganizationMembershipRequestModel,
    OrganizationModel,
);
