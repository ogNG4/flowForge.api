import { Repository } from 'typeorm';
import { ProjectEntity } from '../db';
import { InjectRepository } from '@nestjs/typeorm';

export class ProjectRepository extends Repository<ProjectEntity> {
    constructor(@InjectRepository(ProjectEntity) repository: Repository<ProjectEntity>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async findOneById(id: string): Promise<ProjectEntity | null> {
        return this.findOne({ where: { id } });
    }

    async findAllByOrganizationId(organizationId: string): Promise<ProjectEntity[]> {
        return this.find({ where: { organization: { id: organizationId } } });
    }

    async createProject(project: ProjectEntity): Promise<ProjectEntity> {
        return this.save(project);
    }
}
