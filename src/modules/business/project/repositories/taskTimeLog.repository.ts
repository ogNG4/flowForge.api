import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TaskTimeLogEntity } from '../db/taskTimeLog.entity';

@Injectable()
export class TaskTimeLogRepository extends Repository<TaskTimeLogEntity> {
    constructor(@InjectRepository(TaskTimeLogEntity) repository: Repository<TaskTimeLogEntity>) {
        super(repository.target, repository.manager, repository.queryRunner);
    }

    async createTimeLog(timeLog: TaskTimeLogEntity): Promise<TaskTimeLogEntity> {
        return this.save(timeLog);
    }

    async findByTaskId(taskId: string): Promise<TaskTimeLogEntity[]> {
        return this.find({
            where: { taskId },
            relations: ['user'],
            order: { logDate: 'DESC' },
        });
    }

    async findByUserId(userId: string): Promise<TaskTimeLogEntity[]> {
        return this.find({
            where: { userId },
            relations: ['task'],
            order: { logDate: 'DESC' },
        });
    }

    async getTotalTimeForTask(taskId: string): Promise<number> {
        const result = await this.createQueryBuilder('timeLog')
            .select('SUM(timeLog.timeSpent)', 'total')
            .where('timeLog.taskId = :taskId', { taskId })
            .getRawOne();

        return result.total || 0;
    }
}
