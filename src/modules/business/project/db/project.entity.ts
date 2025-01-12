import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '~/entities';
import { OrganizationEntity } from '../../organization/db';
import { ProjectTaskEntity } from './projectTask.entity';
import { ProjectColumnEntity } from './projectColumn.entity';
import { ProjectSprintEntity } from './projectSprint.entity';

@Entity({ schema: 'application', name: 'projects' })
export class ProjectEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'code', type: 'varchar', length: 255 })
    code: string;

    @Column({ name: 'description', type: 'varchar', length: 255, nullable: true })
    description: string;

    @Column({ name: 'organization_id', type: 'uuid' })
    organizationId: string;

    @OneToMany(() => OrganizationEntity, (organization) => organization.project)
    organization: OrganizationEntity;

    @OneToMany(() => ProjectTaskEntity, (task) => task.project)
    tasks: ProjectTaskEntity[];

    @OneToMany(() => ProjectColumnEntity, (column) => column.project)
    columns: ProjectColumnEntity[];

    @OneToMany(() => ProjectSprintEntity, (sprint) => sprint.project)
    sprints: ProjectSprintEntity[];
}
