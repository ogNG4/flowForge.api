import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { OrganizationMemberService } from '../services/organizationMembers.service';
import { OrganizationMemberDto, OrganizationMemberInputDto } from '../types';

@Controller('organization-member')
@ApiTags('Organization Members')
export class OrganizationMemberController {
    constructor(private readonly organizationMemberService: OrganizationMemberService) {}

    @Get(':organizationId')
    @ApiResponse({
        status: 200,
        type: [OrganizationMemberDto],
    })
    async getOrganizationMembers(@Param('organizationId') organizationId: string) {
        return this.organizationMemberService.getOrganizationMembers(organizationId);
    }

    @Post(':organizationId')
    async addMember(@Param('organizationId') organizationId: string, @Body() payload: OrganizationMemberInputDto) {
        return this.organizationMemberService.addMember(organizationId, payload);
    }
}
