import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectTaskService } from '../services/projectTask.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { NewestTaskDto } from '../types/dto/newestTaskDto';
import { CreateTaskInputDto } from '../types/inputDto/createTask.input.dto';
import { UserClaims } from '~/modules/utils/auth/tools';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { UpdateTaskColumnInputDto } from '../types/inputDto/updateTaskColumn.input.dto';
import { UpdateTaskInputDto } from '../types/inputDto/updateTask.input.dto';
import { TaskDetailsDto } from '../types/dto/taskDetailsDto';

@ApiTags('Project Task')
@Controller('project-task')
export class ProjectTaskController {
    constructor(private readonly projectTaskService: ProjectTaskService) {}

    @Get(':projectId/newest-task')
    @ApiResponse({
        status: 200,
        description: 'Get newest task by project id',
        type: NewestTaskDto,
    })
    async getNewestTask(@Param('projectId') projectId: string) {
        return this.projectTaskService.getNewestTask(projectId);
    }

    @Get(':taskId')
    @ApiResponse({
        status: 200,
        description: 'Get task details by task id',
        type: TaskDetailsDto,
    })
    async getTaskDetails(@Param('taskId') taskId: string) {
        return this.projectTaskService.getTaskDetails(taskId);
    }

    @Post()
    async createTask(@Body() input: CreateTaskInputDto, @UserClaims() user: CurrentUser) {
        return this.projectTaskService.createTask(input, user);
    }

    @Put('column')
    async updateTaskColumn(@Body() input: UpdateTaskColumnInputDto, @UserClaims() user: CurrentUser) {
        return this.projectTaskService.updateTaskColumn(input, user);
    }

    @Put()
    async updateTask(@Body() input: UpdateTaskInputDto, @UserClaims() user: CurrentUser) {
        return this.projectTaskService.updateTask(input, user);
    }
}
