import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '~/entities';
import { ProjectTaskEntity } from './projectTask.entity';
import { UserEntity } from '../../authUserData/db';

@Entity({ schema: 'application', name: 'task_time_logs' })
export class TaskTimeLogEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'task_id', type: 'uuid' })
    taskId: string;

    @Column({ name: 'user_id', type: 'uuid' })
    userId: string;

    @Column({ name: 'time_spent', type: 'int' })
    timeSpent: number;

    @Column({ name: 'log_date', type: 'date' })
    logDate: Date;

    @Column({ name: 'description', type: 'text', nullable: true })
    description?: string;

    @ManyToOne(() => ProjectTaskEntity, (task) => task.timeLogs)
    @JoinColumn({ name: 'task_id' })
    task: ProjectTaskEntity;

    @ManyToOne(() => UserEntity)
    @JoinColumn({ name: 'user_id' })
    user: UserEntity;
}
