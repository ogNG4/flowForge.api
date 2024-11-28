import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateOrganizationInputDto, UserOrganizationDto } from '../types';
import { UserClaims } from '~/modules/utils/auth/tools';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { OrganizationService } from '../services';

@Controller('organization')
@ApiTags('Organization')
export class OrganizationController {
    constructor(private readonly organizationService: OrganizationService) {}
    @Post('')
    async createOrganization(@Body() payload: CreateOrganizationInputDto, @UserClaims() userClaims: CurrentUser) {
        return this.organizationService.createOrganization(payload, userClaims);
    }

    @Get('')
    @ApiResponse({ status: 200, description: 'Get all user organizations', type: [UserOrganizationDto] })
    async getAllUserOrganizations(@UserClaims() userClaims: CurrentUser) {
        return this.organizationService.getAllUserOrganizations(userClaims);
    }
}
