import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BaseEntity } from '~/entities';
import { UserEntity } from '../../authUserData/db';
import { ProjectEntity } from '.';
import { ProjectColumnEntity } from './projectColumn.entity';
import { TaskPriority } from '~/types/domain';
import { TaskTimeLogEntity } from './taskTimeLog.entity';

@Entity({ schema: 'application', name: 'project_tasks' })
export class ProjectTaskEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'name', type: 'varchar', length: 255 })
    name: string;

    @Column({ name: 'content', type: 'text' })
    content: string;

    @Column({ name: 'priority', type: 'varchar', length: 50 })
    priority: TaskPriority;

    @Column({ name: 'code', type: 'varchar', length: 50 })
    code: string;

    @Column({ name: 'above_task_id', type: 'uuid', nullable: true })
    aboveTaskId: string | null;

    @Column({ name: 'project_id', type: 'uuid' })
    projectId: string;

    @Column({ name: 'column_id', type: 'uuid' })
    columnId: string;

    @Column({ name: 'estimated_time', type: 'int', default: 0 })
    estimatedTime: number;

    @Column({ name: 'is_backlog', type: 'boolean', default: false })
    isBacklog: boolean;

    @ManyToOne(() => UserEntity, (user) => user.projectTasks)
    @JoinColumn({ name: 'assigned_user_id' })
    assignedUser: UserEntity | null;

    @ManyToOne(() => ProjectEntity, (project) => project.tasks)
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @ManyToOne(() => ProjectColumnEntity, (column) => column)
    @JoinColumn({ name: 'column_id' })
    column: ProjectColumnEntity;

    @OneToMany(() => TaskTimeLogEntity, (timeLog) => timeLog.task)
    timeLogs: TaskTimeLogEntity[];
}
