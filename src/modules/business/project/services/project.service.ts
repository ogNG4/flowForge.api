import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { ProjectRepository } from '../repositories/project.repository';
import { ProjectEntity } from '../db';
import { CurrentUser } from '~/modules/utils/auth/types/token';
import { CreateProjectInputDto } from '../types/inputDto/createProject.input.dto';
import { ProjectColumnService } from './projectColumn.service';
import { ProjectDto } from '../types/dto/project.dto';

@Injectable()
export class ProjectService {
    constructor(
        private readonly projectRepo: ProjectRepository,
        private readonly projectColumnService: ProjectColumnService
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

        const newProject = await this.projectRepo.save(project);
        await this.projectColumnService.createDefaultColumns(newProject.id, claims.id);
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
}
