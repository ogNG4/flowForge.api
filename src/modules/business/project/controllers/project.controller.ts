import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserClaims } from '~/modules/utils/auth/tools';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { ProjectService } from '../services/project.service';
import { CreateProjectInputDto } from '../types/inputDto/createProject.input.dto';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectDto } from '../types/dto/project.dto';

@Controller('project')
@ApiTags('Project')
export class ProjectController {
    constructor(private readonly projectService: ProjectService) {}
    @Post('')
    async createOrganization(@Body() payload: CreateProjectInputDto, @UserClaims() userClaims: CurrentUser) {
        return this.projectService.createProject(payload, userClaims);
    }

    @Get(':organizationId')
    @ApiResponse({
        status: 200,
        description: 'Get all projects by organization id',
        type: [ProjectDto],
    })
    async getProjectsByOrganizationId(@Param('organizationId') organizationId: string) {
        return this.projectService.getProjectsByOrganizationId(organizationId);
    }

    @Get('user/all')
    @ApiResponse({
        status: 200,
        description: 'Get all projects by user id',
        type: [ProjectDto],
    })
    async getAllUserProjects(@UserClaims() userClaims: CurrentUser) {
        return this.projectService.getAllUserProjects(userClaims.id);
    }

    @Get('details/:projectId')
    @ApiResponse({
        status: 200,
        description: 'Get project details',
        type: ProjectDto,
    })
    async getProjectDetails(@Param('projectId') projectId: string) {
        return this.projectService.getProjectDetails(projectId);
    }
}
