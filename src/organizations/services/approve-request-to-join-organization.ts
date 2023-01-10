import bunyan from 'bunyan';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {OrganizationMembershipRequest} from '../models/OrganizationMembershipRequest';
import {User} from '../../main/models/User';
import {returnForbidden, returnInternalServerError, returnNotFound} from '../../common/use-cases/status-data-container';
import {ApproveRequestToJoinOrganizationFunction} from '../types/approve-request-to-join-organization';
import {errorMessageToDto} from '../../common/use-cases/errors';
import {OrganizationMembershipStatus} from '../enums/OrganizationMembershipStatus';

export const makeApproveRequestToJoinOrganization = (
    logger: bunyan,
    OrganizationMembershipRequestModel: Model<OrganizationMembershipRequest>,
    OrganizationModel: Model<Organization>,
): ApproveRequestToJoinOrganizationFunction => {
  return async function approveRequestToJoinOrganization(
      requestingUser: User,
      organizationMembershipRequestId: string,
  ) {
    logger.info(`Request to approve organization membership request with ID: ${organizationMembershipRequestId}`);
    const organizationMembershipRequestModel = await OrganizationMembershipRequestModel
        .findOne({id: organizationMembershipRequestId}, {__v: 0});
    if (!organizationMembershipRequestModel) {
      return returnNotFound();
    }
    const organizationModel = await OrganizationModel
        .findOne({id: organizationMembershipRequestModel.organizationId}, {__v: 0});
    if (!organizationModel) {
      logger.error(`Organization membership request with ID: ${organizationMembershipRequestId} references non-existent organization`);
      return {
        status: 400,
        data: errorMessageToDto(`Organization with ID: ${organizationMembershipRequestModel.organizationId} does not exist`),
      };
    }
    if (!organizationModel.administratorEmails.includes(requestingUser.email)) {
      return returnForbidden();
    }
    if (organizationModel.memberEmails.includes(organizationMembershipRequestModel.requestingUserEmail)) {
      return {
        status: 400,
        data: {
          status: OrganizationMembershipStatus[OrganizationMembershipStatus.USER_ALREADY_MEMBER],
        },
      };
    }
    organizationModel.memberEmails.push(organizationMembershipRequestModel.requestingUserEmail);
    organizationMembershipRequestModel.isApproved = true;
    organizationMembershipRequestModel.approvingAdministratorEmail = requestingUser.email;
    try {
      await organizationModel.markModified('memberEmails');
      await organizationModel.save();
      await organizationMembershipRequestModel.save();
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
    return {
      status: 200,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.SUCCESS],
      },
    };
  };
};
