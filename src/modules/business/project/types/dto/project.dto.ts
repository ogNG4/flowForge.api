import { ApiProperty } from '@nestjs/swagger';
import { UserOrganizationDto } from '~/modules/business/organization/types';

export class ProjectDto {
    @ApiProperty({})
    id: string;

    @ApiProperty({})
    name: string;

    @ApiProperty({})
    code: string;

    @ApiProperty({})
    organizationId: string;

    @ApiProperty({
        type: UserOrganizationDto,
    })
    organization?: Partial<UserOrganizationDto>;
}
