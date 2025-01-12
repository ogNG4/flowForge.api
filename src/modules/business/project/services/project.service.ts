import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectEntity } from '../db';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { CreateProjectInputDto } from '../types/inputDto/createProject.input.dto';
import { ProjectColumnService } from './projectColumn.service';
import { ProjectDto } from '../types/dto/project.dto';
import { ProjectSprintRepository } from '../repositories/projectSprint.repository';
import { ProjectTimeSpentDto, TaskWithUsersTimeDto, UserWithTasksTimeDto } from '../types/dto/projectTimeSpent.dto';

@Injectable()
export class ProjectService {
    constructor(
        private readonly projectRepo: ProjectRepository,
        private readonly projectColumnService: ProjectColumnService,
        private readonly sprintRepo: ProjectSprintRepository
    ) {}

    private toProjectDto(project: ProjectEntity): ProjectDto {
        return {
            id: project.id,
            name: project.name,
            code: project.code,
            organizationId: project.organizationId,
            organization: project.organization,
        };
    }

    private async checkProjectExists(name: string) {
        const project = await this.projectRepo.findOne({ where: { name } });
        return project;
    }

    async createProject(payload: CreateProjectInputDto, claims: CurrentUser) {
        const projectExists = await this.checkProjectExists(payload.name);
        if (projectExists) {
            throw new ConflictException('Project already exists');
        }

        const project = new ProjectEntity();
        project.name = payload.name;
        project.code = payload.code;
        project.organizationId = payload.organizationId;
        project.createdBy = claims.id;
        project.description = payload.description;

        const newProject = await this.projectRepo.save(project);
        await this.projectColumnService.createDefaultColumns(newProject.id, claims.id);
        const sprint = this.sprintRepo.create({
            projectId: newProject.id,
            number: 1,
            startDate: new Date(),
            endDate: new Date(new Date().setDate(new Date().getDate() + 14)),
            isActive: true,
            goal: '',
            createdBy: claims.id,
        });
        await this.sprintRepo.save(sprint);
    }

    async getProjectsByOrganizationId(organizationId: string): Promise<ProjectDto[]> {
        const projects = await this.projectRepo.find({ where: { organizationId }, relations: ['organization'] });
        return projects.map((project) => this.toProjectDto(project));
    }

    async getAllUserProjects(userId: string): Promise<ProjectDto[]> {
        const projects = await this.projectRepo.find({
            where: { createdBy: userId },
            relations: ['organization'],
            order: { createdAt: 'DESC' },
        });
        return projects.map((project) => this.toProjectDto(project));
    }

    async getProjectDetails(projectId: string): Promise<ProjectDto> {
        const project = await this.projectRepo.findOne({ where: { id: projectId }, relations: ['organization'] });
        if (!project) {
            throw new NotFoundException('Project not found');
        }
        return this.toProjectDto(project);
    }

    async getProjectTimeStats(projectId: string): Promise<ProjectTimeSpentDto> {
        const project = await this.projectRepo.findOne({
            where: { id: projectId },
            relations: ['tasks', 'tasks.timeLogs', 'tasks.timeLogs.user', 'tasks.assignedUser'],
        });

        if (!project) {
            throw new NotFoundException('Projekt nie został znaleziony');
        }

        const userStatsMap = new Map<string, UserWithTasksTimeDto>();
        const taskStatsMap = new Map<string, TaskWithUsersTimeDto>();
        let totalProjectTimeSpent = 0;

        // Inicjalizacja map dla zadań
        project.tasks.forEach((task) => {
            taskStatsMap.set(task.id, {
                taskId: task.id,
                taskCode: task.code,
                userTimes: [],
                totalTimeSpent: 0,
            });
        });

        // Przetwarzanie logów czasu
        project.tasks.forEach((task) => {
            task.timeLogs.forEach((timeLog) => {
                const userId = timeLog.user.id;
                const timeSpent = timeLog.timeSpent;
                totalProjectTimeSpent += timeSpent;

                // Aktualizacja statystyk użytkownika
                if (!userStatsMap.has(userId)) {
                    userStatsMap.set(userId, {
                        user: {
                            id: timeLog.user.id,
                            name: `${timeLog.user.firstName} ${timeLog.user.lastName}`,
                        },
                        taskTimes: [],
                        totalTimeSpent: 0,
                    });
                }
                const userStats = userStatsMap.get(userId)!;
                userStats.totalTimeSpent += timeSpent;

                // Dodaj lub zaktualizuj czas zadania dla użytkownika
                let taskTime = userStats.taskTimes.find((t) => t.taskId === task.id);
                if (!taskTime) {
                    taskTime = {
                        taskId: task.id,
                        taskCode: task.code,
                        timeSpent: 0,
                    };
                    userStats.taskTimes.push(taskTime);
                }
                taskTime.timeSpent += timeSpent;

                // Aktualizacja statystyk zadania
                const taskStats = taskStatsMap.get(task.id)!;
                taskStats.totalTimeSpent += timeSpent;

                // Dodaj lub zaktualizuj czas użytkownika dla zadania
                let userTime = taskStats.userTimes.find((u) => u.user.id === userId);
                if (!userTime) {
                    userTime = {
                        user: {
                            id: timeLog.user.id,
                            name: `${timeLog.user.firstName} ${timeLog.user.lastName}`,
                        },
                        timeSpent: 0,
                    };
                    taskStats.userTimes.push(userTime);
                }
                userTime.timeSpent += timeSpent;
            });
        });

        return {
            projectId: project.id,
            projectName: project.name,
            userStats: Array.from(userStatsMap.values()),
            taskStats: Array.from(taskStatsMap.values()),
            totalTimeSpent: totalProjectTimeSpent,
        };
    }
}
