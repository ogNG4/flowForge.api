import { Injectable } from '@nestjs/common';
import { ProjectColumnEntity } from '../db/projectColumn.entity';
import { ProjectColumnRepository } from '../repositories/projectColumn.repository';
import { ProjectColumnDto } from '../types/dto/projectColumn.dto';

@Injectable()
export class ProjectColumnService {
    constructor(private readonly projectColumnRepo: ProjectColumnRepository) {}

    async createDefaultColumns(projectId: string, createdBy: string) {
        const columns = [
            { name: 'Do zrobienia ', order: 0 },
            { name: 'W trakcie', order: 1 },
            { name: 'Zrobione', order: 2 },
        ];

        await Promise.all(
            columns.map(async (column) => {
                const newColumn = new ProjectColumnEntity();
                newColumn.name = column.name;
                newColumn.order = column.order;
                newColumn.projectId = projectId;
                newColumn.createdBy = createdBy;
                return this.projectColumnRepo.createColumn(newColumn);
            })
        );
    }

    async getColumnsByProjectId(projectId: string): Promise<ProjectColumnDto[]> {
        const columns = await this.projectColumnRepo.find({ where: { projectId } });
        return columns.map((column) => {
            return {
                id: column.id,
                name: column.name,
                order: column.order,
            };
        });
    }
}
