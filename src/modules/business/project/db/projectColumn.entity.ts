import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ProjectEntity } from '.';
import { BaseEntity } from '~/entities';

@Entity({ schema: 'application', name: 'project_columns' })
export class ProjectColumnEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'order', type: 'int' })
    order: number;

    @Column({ name: 'project_id', type: 'uuid' })
    projectId: string;

    @ManyToOne(() => ProjectEntity, (project) => project.columns)
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;
}
