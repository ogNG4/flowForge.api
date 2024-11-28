import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '~/entities';
import { UserEntity } from '../../authUserData/db';
import { ProjectEntity } from '.';
import { ProjectColumnEntity } from './projectColumn.entity';

@Entity({ schema: 'application', name: 'project_tasks' })
export class ProjectTaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'content', type: 'text' })
    content: string;

    @ManyToOne(() => UserEntity, (user) => user.projectTasks)
    @JoinColumn({ name: 'assigned_user_id' })
    assignedUser: UserEntity | null;

    @ManyToOne(() => ProjectEntity, (project) => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @ManyToOne(() => ProjectColumnEntity, (column) => column)
    @JoinColumn({ name: 'column_id' })
    column: ProjectColumnEntity;
}
