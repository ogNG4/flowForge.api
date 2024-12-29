import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ProjectSprintRepository } from '../repositories/projectSprint.repository';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { ProjectTaskRepository } from '../repositories/projectTask.repository';
import { SprintDto } from '../types/dto/sprint.dto';
import { ProjectSprintEntity } from '../db/projectSprint.entity';
import { CreateSprintInputDto } from '../types/inputDto/createSprint.input.dto';

@Injectable()
export class ProjectSprintService {
    constructor(private readonly sprintRepo: ProjectSprintRepository) {}

    toSprintDto(sprint: ProjectSprintEntity): SprintDto {
        return {
            id: sprint.id,
            number: sprint.number,
            goal: sprint.goal,
            startDate: sprint.startDate,
            endDate: sprint.endDate,
            isActive: sprint.isActive,
        };
    }

    async createSprint(input: CreateSprintInputDto, currentUser: CurrentUser) {
        const activeSprint = await this.sprintRepo.findActiveSprintByProjectId(input.projectId);

        if (activeSprint) {
            await this.sprintRepo.update(activeSprint.id, { isActive: false });
        }

        const sprint = this.sprintRepo.create({
            ...input,
            createdBy: currentUser.id,
            isActive: true,
            number: activeSprint ? activeSprint.number + 1 : 1,
        });

        await this.sprintRepo.save(sprint);
    }

    async getActiveSprintByProjectId(projectId: string): Promise<SprintDto> {
        const sprint = await this.sprintRepo.findActiveSprintByProjectId(projectId);
        if (!sprint) {
            throw new NotFoundException('Sprint not found');
        }
        return this.toSprintDto(sprint);
    }
}
