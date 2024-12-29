import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectSprintEntity } from '../db/projectSprint.entity';

@Injectable()
export class ProjectSprintRepository extends Repository<ProjectSprintEntity> {
    constructor(@InjectRepository(ProjectSprintEntity) repository: Repository<ProjectSprintEntity>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findActiveSprintByProjectId(projectId: string): Promise<ProjectSprintEntity | null> {
        return this.findOne({
            where: { projectId, isActive: true },
        });
    }

    async findSprintsByProjectId(projectId: string): Promise<ProjectSprintEntity[]> {
        return this.find({
            where: { projectId },
            order: { startDate: 'DESC' },
        });
    }

    async createSprint(sprint: ProjectSprintEntity) {
        return this.save(sprint);
    }
}
