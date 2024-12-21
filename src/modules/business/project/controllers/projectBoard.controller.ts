import { Controller, Get, Param } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { ProjectBoardService } from '../services/projectBoard.service';
import { ProjectBoardDto } from '../types/dto/projectBoard.dto';
import { ProjectColumnService } from '../services/projectColumn.service';
import { ProjectColumnDto } from '../types/dto/projectColumn.dto';

@Controller('project-board')
@ApiTags('Project Board')
export class ProjectBoardController {
    constructor(
        private readonly projectService: ProjectBoardService,
        private readonly projectColumnService: ProjectColumnService
    ) {}

    @Get(':projectId')
    @ApiResponse({
        status: 200,
        description: 'Get project board',
        type: ProjectBoardDto,
    })
    async getProjectBoard(@Param('projectId') projectId: string) {
        return this.projectService.getProjectBoard(projectId);
    }

    @Get(':projectId/columns')
    @ApiResponse({
        status: 200,
        description: 'Get columns by project id',
        type: [ProjectColumnDto],
    })
    async getColumnsByProjectId(@Param('projectId') projectId: string) {
        return this.projectColumnService.getColumnsByProjectId(projectId);
    }
}
