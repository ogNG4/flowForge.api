import { ApiProperty } from '@nestjs/swagger';

class OrganizationOwnerDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}

export class UserOrganizationDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    joinedAt: string;

    @ApiProperty()
    owner: OrganizationOwnerDto;
}
