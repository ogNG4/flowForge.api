import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProjectColumnEntity } from '../db/projectColumn.entity';

export class ProjectColumnRepository extends Repository<ProjectColumnEntity> {
    constructor(@InjectRepository(ProjectColumnEntity) repository: Repository<ProjectColumnEntity>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async createColumn(column: ProjectColumnEntity) {
        return this.save(column);
    }
}
