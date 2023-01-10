import {User} from '../../main/models/User';
import {StatusDataContainer} from '../../main/dtos/StatusDataContainer';
import {OrganizationDto} from '../dtos/OrganizationDto';

export type CreateOrganizationFunction = (
    requestingUser: User,
    name: string,
) => Promise<StatusDataContainer<OrganizationDto>>;
