import { Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectColumnWithTasksDto } from '../types/dto/projectColumnWithTasksDto';
import { ProjectColumnEntity } from '../db/projectColumn.entity';
import { ProjectBoardDto } from '../types/dto/projectBoard.dto';
import { ProjectSprintRepository } from '../repositories/projectSprint.repository';
import { ProjectSprintEntity } from '../db/projectSprint.entity';

@Injectable()
export class ProjectBoardService {
    constructor(
        private readonly projectRepo: ProjectRepository,
        private readonly sprintRepo: ProjectSprintRepository
    ) {}

    toProjectColumnWithTasksDto(column: ProjectColumnEntity): ProjectColumnWithTasksDto {
        return {
            id: column.id,
            name: column.name,
            order: column.order,
            tasks: column.tasks.map((task) => {
                return {
                    id: task.id,
                    name: task.name,
                    code: task.code,
                    assignedUser: task.assignedUser
                        ? {
                              id: task.assignedUser.id,
                              name: task.assignedUser.firstName + ' ' + task.assignedUser.lastName,
                          }
                        : {
                              id: '',
                              name: '',
                          },
                    priority: task.priority,
                    aboveTaskId: task.aboveTaskId,
                    isBacklog: task.isBacklog,
                };
            }),
        };
    }

    async getProjectBoard(projectId: string): Promise<ProjectBoardDto> {
        const project = await this.projectRepo.findOne({
            where: {
                id: projectId,
            },
            relations: ['columns', 'columns.tasks', 'columns.tasks.assignedUser'],
        });

        if (!project) {
            throw new NotFoundException('Project not found');
        }

        return {
            columns: project.columns.map((column) => {
                const columnDto = this.toProjectColumnWithTasksDto(column);
                return {
                    ...columnDto,
                    tasks: columnDto.tasks.filter((task) => !task.isBacklog),
                };
            }),
            organizationId: project.organizationId,
            name: project.name,
        };
    }
}
