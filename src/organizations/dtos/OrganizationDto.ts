export interface OrganizationDto {
    id: string;
    name: string;
    memberEmails: Array<string>;
    administratorEmails: Array<string>;
}
