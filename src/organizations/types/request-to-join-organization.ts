import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationMembershipStatusDto} from '../dtos/OrganizationMembershipStatusDto';

export type RequestToJoinOrganizationFunction = (
    requestingUser: User,
    organizationId: string,
) => Promise<StatusDataContainer<OrganizationMembershipStatusDto>>;
