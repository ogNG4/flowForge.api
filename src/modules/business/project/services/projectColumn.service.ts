import { Injectable } from '@nestjs/common';
import { ProjectColumnEntity } from '../db/projectColumn.entity';
import { ProjectColumnRepository } from '../repositories/projectColumn.repository';
import { ProjectColumnDto } from '../types/dto/projectColumn.dto';
import { CreateProjectColumnInputDto } from '../types/inputDto/createProjectColumn.input.dto';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { UpdateColumnsOrderInputDto } from '../types/inputDto/updateColumnsOrder.input.dto';

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

    async createColumn(payload: CreateProjectColumnInputDto, userClaims: CurrentUser) {
        const newColumn = new ProjectColumnEntity();
        newColumn.name = payload.name;
        newColumn.projectId = payload.projectId;
        newColumn.createdBy = userClaims.id;

        const existingColumns = await this.projectColumnRepo.find({
            where: { projectId: payload.projectId },
            order: { order: 'ASC' },
        });

        if (payload.previousColumnId) {
            const prevColumnIndex = existingColumns.findIndex((col) => col.id === payload.previousColumnId);
            if (prevColumnIndex === -1) {
                throw new Error('Previous column not found');
            }

            const prevOrder = existingColumns[prevColumnIndex].order;
            const nextOrder =
                prevColumnIndex + 1 < existingColumns.length
                    ? existingColumns[prevColumnIndex + 1].order
                    : prevOrder + 2;

            newColumn.order = prevOrder + (nextOrder - prevOrder) / 2;
        } else {
            const lastColumn = existingColumns[existingColumns.length - 1];
            newColumn.order = lastColumn ? lastColumn.order + 1 : 0;
        }

        return this.projectColumnRepo.createColumn(newColumn);
    }

    async updateColumnsOrder(payload: UpdateColumnsOrderInputDto) {
        for (const column of payload.columns) {
            const updatedColumn = new ProjectColumnEntity();
            updatedColumn.id = column.id;
            updatedColumn.order = column.order;
            await this.projectColumnRepo.update(column.id, updatedColumn);
        }
    }
}
