import { Injectable, ConflictException, NotFoundException } from '@nestjs/common';
import { ProjectSprintRepository } from '../repositories/projectSprint.repository';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { ProjectTaskRepository } from '../repositories/projectTask.repository';
import { SprintDto } from '../types/dto/sprint.dto';
import { ProjectSprintEntity } from '../db/projectSprint.entity';
import { CreateSprintInputDto } from '../types/inputDto/createSprint.input.dto';
import { Not } from 'typeorm';

@Injectable()
export class ProjectSprintService {
    constructor(
        private readonly sprintRepo: ProjectSprintRepository,
        private readonly taskRepo: ProjectTaskRepository
    ) {}

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
            // If moveToNext is true, move unfinished tasks to the new sprint
            if (input.moveToNext) {
                const unfinishedTasks = await this.taskRepo.find({
                    where: {
                        sprint: { id: activeSprint.id },
                        column: { name: Not('Zrobione') }, // Assuming "Zrobione" is your "Done" column name
                    },
                    relations: ['sprint', 'column'],
                });

                console.log(unfinishedTasks);

                // Create new sprint
                const newSprint = this.sprintRepo.create({
                    ...input,
                    createdBy: currentUser.id,
                    isActive: true,
                    number: activeSprint.number + 1,
                });
                await this.sprintRepo.save(newSprint);

                // Move unfinished tasks to new sprint
                if (unfinishedTasks.length > 0) {
                    console.log(unfinishedTasks.map((task) => task.id));
                    await this.taskRepo.update(
                        unfinishedTasks.map((task) => task.id),
                        { sprint: { id: newSprint.id } }
                    );
                }
            }

            // Deactivate current sprint
            await this.sprintRepo.update(activeSprint.id, { isActive: false });
        } else {
            // If no active sprint exists, create first sprint
            const sprint = this.sprintRepo.create({
                ...input,
                createdBy: currentUser.id,
                isActive: true,
                number: 1,
            });
            await this.sprintRepo.save(sprint);
        }
    }

    async getActiveSprintByProjectId(projectId: string): Promise<SprintDto> {
        const sprint = await this.sprintRepo.findActiveSprintByProjectId(projectId);
        if (!sprint) {
            throw new NotFoundException('Sprint not found');
        }
        return this.toSprintDto(sprint);
    }
}
