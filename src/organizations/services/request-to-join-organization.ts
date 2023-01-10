import bunyan from 'bunyan';
import {Organization} from '../models/Organization';
import {Model} from 'mongoose';
import {RequestToJoinOrganizationFunction} from '../types/request-to-join-organization';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';
import {User} from '../../main/models/User';
import {OrganizationMembershipRequest} from '../models/OrganizationMembershipRequest';
import {OrganizationMembershipStatus} from '../enums/OrganizationMembershipStatus';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';

export const makeRequestToJoinOrganization = (
    logger: bunyan,
    OrganizationModel: Model<Organization>,
    OrganizationMembershipRequestModel: Model<OrganizationMembershipRequest>,
    generateId: GenerateIdFunction,
): RequestToJoinOrganizationFunction => {
  return async function requestToJoinOrganization(
      requestingUser: User,
      organizationId: string) {
    logger.info(`Request to join organization with ID: ${organizationId}`);

    const organizationModel = await OrganizationModel.findOne({id: organizationId}, {__v: 0});
    if (!organizationModel) {
      return {
        status: 400,
        data: {
          status: OrganizationMembershipStatus[OrganizationMembershipStatus.ORGANIZATION_DOES_NOT_EXIST],
        },
      };
    }
    if (organizationModel.memberEmails.includes(requestingUser.email) ||
            organizationModel.administratorEmails.includes(requestingUser.email)) {
      return {
        status: 400,
        data: {
          status: OrganizationMembershipStatus[OrganizationMembershipStatus.USER_ALREADY_MEMBER],
        },
      };
    }

    const organizationMembershipRequestModel = await OrganizationMembershipRequestModel
        .findOne({organizationId, requestingUserEmail: requestingUser.email}, {__v: 0});
    if (organizationMembershipRequestModel) {
      return {
        status: 409,
        data: {
          status: OrganizationMembershipStatus[OrganizationMembershipStatus.REQUEST_ALREADY_EXISTS],
        },
      };
    }

    const organizationMembershipRequest: OrganizationMembershipRequest = {
      id: await generateId(DEFAULT_ID_LENGTH),
      organizationId,
      requestingUserEmail: requestingUser.email,
      isApproved: false,
    };
    try {
      await new OrganizationMembershipRequestModel(organizationMembershipRequest).save();
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
    return {
      status: 200,
      data: {
        status: OrganizationMembershipStatus[OrganizationMembershipStatus.AWAITING_APPROVAL],
      },
    };
  };
};
