import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProjectColumnService } from '../services/projectColumn.service';
import { ApiResponse } from '@nestjs/swagger';
import { ProjectColumnDto } from '../types/dto/projectColumn.dto';

@Controller('project/column')
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
}
