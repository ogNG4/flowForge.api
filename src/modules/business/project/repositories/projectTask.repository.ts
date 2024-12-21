import { Injectable } from '@nestjs/common';
import { ProjectTaskEntity } from '../db/projectTask.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProjectTaskRepository extends Repository<ProjectTaskEntity> {
    constructor(@InjectRepository(ProjectTaskEntity) repository: Repository<ProjectTaskEntity>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async createTask(task: ProjectTaskEntity) {
        return this.save(task);
    }
}
