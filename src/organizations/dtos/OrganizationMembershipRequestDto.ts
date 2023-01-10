export interface OrganizationMembershipRequestDto {
    id: string;
    organizationId: string;
    requestingUserEmail: string;
    isApproved: boolean;
    approvingAdministratorEmail?: string;
}
