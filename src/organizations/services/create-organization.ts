import bunyan from 'bunyan';
import {GenerateIdFunction} from '../../util/id/types/generate-id';
import {Model} from 'mongoose';
import {Organization} from '../models/Organization';
import {User} from '../../main/models/User';
import {CreateOrganizationFunction} from '../types/create-organization';
import {DEFAULT_ID_LENGTH} from '../../util/id/constants/default-id-length';
import {returnInternalServerError} from '../../common/use-cases/status-data-container';

export const makeCreateOrganization = (
    logger: bunyan,
    generateId: GenerateIdFunction,
    OrganizationModel: Model<Organization>,
): CreateOrganizationFunction => {
  return async function createOrganization(
      requestingUser: User,
      name: string,
  ) {
    const organization: Organization = {
      id: await generateId(DEFAULT_ID_LENGTH),
      name,
      administratorEmails: [requestingUser.email],
      memberEmails: [requestingUser.email],
    };

    try {
      await new OrganizationModel(organization).save();
      logger.info(`POST new organization with ID: ${organization.id}`);
      return {
        status: 201,
        data: {
          ...organization,
        },
      };
    } catch (err) {
      logger.error(`An error has occurred: ${err}`);
      return returnInternalServerError();
    }
  };
};
