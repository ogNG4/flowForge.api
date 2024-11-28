import { ApiProperty } from '@nestjs/swagger';
import { OrganizationMemberRole } from '~/types/domain';

export class OrganizationMemberDto {
    @ApiProperty({})
    id: string;

    @ApiProperty({})
    email: string;

    @ApiProperty({})
    firstName: string;

    @ApiProperty({})
    lastName: string;

    @ApiProperty({})
    joinedAt: Date;

    @ApiProperty({})
    role: OrganizationMemberRole;
}
