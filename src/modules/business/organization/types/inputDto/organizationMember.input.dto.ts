import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsNotEmpty, IsUUID } from 'class-validator';
import { OrganizationMemberRole } from '~/types/domain';

export class OrganizationMemberInputDto {
    @IsEmail()
    @IsNotEmpty()
    @ApiProperty({})
    email: string;

    @IsEnum(OrganizationMemberRole)
    @IsNotEmpty()
    @ApiProperty({})
    role: OrganizationMemberRole;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({})
    organizationId: string;
}
