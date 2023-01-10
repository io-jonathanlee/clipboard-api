import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationMembershipStatusDto} from '../dtos/OrganizationMembershipStatusDto';
import {ErrorDto} from '../../main/dtos/ErrorDto';

export type ApproveRequestToJoinOrganizationFunction = (
    requestingUser: User,
    organizationMembershipRequestId: string,
) => Promise<StatusDataContainer<OrganizationMembershipStatusDto | ErrorDto>>;
