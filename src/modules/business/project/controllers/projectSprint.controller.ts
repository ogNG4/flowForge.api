import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserClaims } from '~/modules/utils/auth/tools';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { ProjectSprintService } from '../services/projectSprint.service';
import { SprintDto } from '../types/dto/sprint.dto';
import { CreateSprintInputDto } from '../types/inputDto/createSprint.input.dto';

@ApiTags('Project Sprint')
@Controller('project-sprint')
export class ProjectSprintController {
    constructor(private readonly sprintService: ProjectSprintService) {}

    @Post()
    @ApiResponse({
        status: 201,
        description: 'Sprint created successfully',
    })
    async createSprint(@Body() input: CreateSprintInputDto, @UserClaims() user: CurrentUser) {
        return this.sprintService.createSprint(input, user);
    }

    @Get('active/:projectId')
    @ApiResponse({
        status: 200,
        description: 'Get active sprint for project',
        type: SprintDto,
    })
    async getActiveSprint(@Param('projectId') projectId: string) {
        return this.sprintService.getActiveSprintByProjectId(projectId);
    }

    //    @Get('project/:projectId')
    //      @ApiResponse({
    //         status: 200,
    //         description: 'Get all sprints for project',
    //         type: [SprintDto],
    //     })
    //     async getProjectSprints(@Param('projectId') projectId: string) {
    //         return this.sprintService.getSprintsByProjectId(projectId);
    //     }

    //     @Get('active/:projectId')
    //     @ApiResponse({
    //         status: 200,
    //         description: 'Get active sprint for project',
    //         type: SprintDto,
    //     })
    //     async getActiveSprint(@Param('projectId') projectId: string) {
    //         return this.sprintService.getActiveSprintByProjectId(projectId);
    //     }

    // @Put('add-task')
    // async addTaskToSprint(@Body() input: AddTaskToSprintInputDto, @UserClaims() user: CurrentUser) {
    //     return this.sprintService.addTaskToSprint(input, user);
    // }
}
