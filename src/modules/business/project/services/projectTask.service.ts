import { NotFoundException, Injectable } from '@nestjs/common';
import { ProjectTaskRepository } from '../repositories/projectTask.repository';
import { NewestTaskDto } from '../types/dto/newestTaskDto';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { CreateTaskInputDto } from '../types/inputDto/createTask.input.dto';
import { ProjectEntity } from '../db';
import { ProjectRepository } from '../repositories/project.repository';
import { IsNull, Not } from 'typeorm';
import { UpdateTaskColumnInputDto } from '../types/inputDto/updateTaskColumn.input.dto';
import { TaskDetailsDto } from '../types/dto/taskDetailsDto';
import { UpdateTaskInputDto } from '../types/inputDto/updateTask.input.dto';
import { TaskTimeLogInputDto } from '../types/inputDto/taskTimeLog.input.dto';
import { TaskTimeLogRepository } from '../repositories/taskTimeLog.repository';
import { BoardTaskDto } from '../types/dto/boardTaskDto';

@Injectable()
export class ProjectTaskService {
    constructor(
        private readonly projectTaskRepo: ProjectTaskRepository,
        private readonly projectRepo: ProjectRepository,
        private readonly taskTimeLogRepo: TaskTimeLogRepository
    ) {}

    async getNewestTask(projectId: string): Promise<NewestTaskDto> {
        const task = await this.projectTaskRepo.findOne({ where: { projectId } });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return {
            id: task.id,
            code: task.code,
        };
    }

    private async createCode(project: ProjectEntity) {
        const newestTask = await this.projectTaskRepo.findOne({
            where: { projectId: project.id },
            order: { createdAt: 'DESC' },
        });
        const projectCode = project.code;

        if (!newestTask) return `${projectCode}-1`;
        const newestTaskNumber = Number(newestTask.code.split('-')[1]);
        return `${projectCode}-${newestTaskNumber + 1}`;
    }

    async createTask(input: CreateTaskInputDto, CurrentUser: CurrentUser) {
        const project = await this.projectRepo.findOneById(input.projectId);
        if (!project) {
            throw new NotFoundException('Project not found');
        }

        const code = await this.createCode(project);
        const task = this.projectTaskRepo.create({
            name: input.name,
            content: input.content,
            priority: input.priority,
            code,
            projectId: project.id,
            columnId: input.columnId,
            createdBy: CurrentUser.id,
            assignedUser: input.assignedUserId ? { id: input.assignedUserId } : null,
            estimatedTime: input.estimatedTime || 0,
            isBacklog: input.isBacklog || false,
        });
        const newTask = await this.projectTaskRepo.save(task);
        await this.projectTaskRepo.update({ aboveTaskId: IsNull(), id: Not(newTask.id) }, { aboveTaskId: newTask.id });
    }

    async updateTask(payload: UpdateTaskInputDto, currentUser: CurrentUser) {
        await this.projectTaskRepo.update(
            { id: payload.taskId },
            {
                name: payload.name,
                content: payload.content,
                priority: payload.priority,
                updatedBy: currentUser.id,
                assignedUser: payload.assignedUserId ? { id: payload.assignedUserId } : null,
                estimatedTime: payload.estimatedTime || 0,
            }
        );
    }

    async updateTaskColumn(payload: UpdateTaskColumnInputDto, currentUser: CurrentUser) {
        await this.projectTaskRepo.update(
            { id: payload.taskId },
            { columnId: payload.columnId, updatedBy: currentUser.id, aboveTaskId: payload.aboveTaskId ?? null }
        );
    }

    async getTaskDetails(taskId: string): Promise<TaskDetailsDto> {
        const task = await this.projectTaskRepo.findOne({
            where: { id: taskId },
            relations: ['assignedUser', 'project', 'project.organization', 'timeLogs', 'timeLogs.user'],
        });
        if (!task) {
            throw new NotFoundException('Task not found');
        }
        return {
            id: task.id,
            name: task.name,
            code: task.code,
            content: task.content,
            assignedUser: task.assignedUser
                ? {
                      id: task.assignedUser.id,
                      name: task.assignedUser.firstName + ' ' + task.assignedUser.lastName,
                  }
                : {
                      id: '',
                      name: '',
                  },
            priority: task.priority,
            aboveTaskId: task.aboveTaskId,
            columnId: task.columnId,
            organizationId: task.project.organizationId,
            timeLogs: task.timeLogs.map((timeLog) => ({
                id: timeLog.id,
                timeSpent: timeLog.timeSpent,
                logDate: timeLog.logDate,
                description: timeLog.description || '',
                user: {
                    id: timeLog.user.id,
                    name: timeLog.user.firstName + ' ' + timeLog.user.lastName,
                },
            })),
            totalTimeSpent: task.timeLogs.reduce((acc, timeLog) => acc + timeLog.timeSpent, 0),
            estimatedTime: task.estimatedTime,
        };
    }

    async getBacklogByProjectId(projectId: string): Promise<BoardTaskDto[]> {
        const backlog = await this.projectTaskRepo.find({
            where: { projectId, isBacklog: true },
            relations: ['assignedUser'],
        });
        return backlog.map((task) => {
            return {
                id: task.id,
                name: task.name,
                code: task.code,
                assignedUser: task.assignedUser
                    ? {
                          id: task.assignedUser.id,
                          name: task.assignedUser.firstName + ' ' + task.assignedUser.lastName,
                      }
                    : {
                          id: '',
                          name: '',
                      },
                priority: task.priority,
                aboveTaskId: task.aboveTaskId ? task.aboveTaskId : null,
            };
        });
    }

    async createTimeLog(payload: TaskTimeLogInputDto, currentUser: CurrentUser) {
        const timeLog = this.taskTimeLogRepo.create({
            taskId: payload.taskId,
            userId: currentUser.id,
            timeSpent: payload.timeSpent,
            logDate: new Date(),
            description: payload.description,
        });
        return this.taskTimeLogRepo.save(timeLog);
    }
}
