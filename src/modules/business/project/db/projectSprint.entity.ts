import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '~/entities';
import { ProjectEntity } from './project.entity';
import { ProjectTaskEntity } from './projectTask.entity';

@Entity({ schema: 'application', name: 'project_sprints' })
export class ProjectSprintEntity extends BaseEntity {
    @PrimaryGeneratedColumn('uuid', { name: 'id' })
    id: string;

    @Column({ name: 'number', type: 'int' })
    number: number;

    @Column({ name: 'goal', type: 'text' })
    goal: string;

    @Column({ name: 'start_date', type: 'date' })
    startDate: Date;

    @Column({ name: 'end_date', type: 'date' })
    endDate: Date;

    @Column({ name: 'project_id', type: 'uuid' })
    projectId: string;

    @Column({ name: 'is_active', type: 'boolean', default: false })
    isActive: boolean;

    @ManyToOne(() => ProjectEntity, (project) => project.sprints)
    @JoinColumn({ name: 'project_id' })
    project: ProjectEntity;

    @OneToMany(() => ProjectTaskEntity, (task) => task.sprint)
    tasks: ProjectTaskEntity[];
}
