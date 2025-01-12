import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { ProjectColumnService } from '../services/projectColumn.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectColumnDto } from '../types/dto/projectColumn.dto';
import { CreateProjectColumnInputDto } from '../types/inputDto/createProjectColumn.input.dto';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { UserClaims } from '~/modules/utils/auth/tools';
import { UpdateColumnsOrderInputDto } from '../types/inputDto/updateColumnsOrder.input.dto';

@Controller('project/column')
@ApiTags('Column ')
export class ProjectColumnController {
    constructor(private readonly projectColumnService: ProjectColumnService) {}

    @Get(':projectId')
    @ApiResponse({
        status: 200,
        description: 'Get all columns by project id',
        type: [ProjectColumnDto],
    })
    async getColumnsByProjectId(@Param('projectId') projectId: string) {
        return this.projectColumnService.getColumnsByProjectId(projectId);
    }

    @Post('')
    @ApiResponse({
        status: 200,
        description: 'Create a column for a project',
    })
    async createColumn(@Body() payload: CreateProjectColumnInputDto, @UserClaims() user: CurrentUser) {
        return this.projectColumnService.createColumn(payload, user);
    }

    @Put('order')
    @ApiResponse({
        status: 200,
        description: 'Update columns order',
    })
    async updateColumnsOrder(@Body() payload: UpdateColumnsOrderInputDto) {
        return this.projectColumnService.updateColumnsOrder(payload);
    }
}
