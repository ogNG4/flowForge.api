import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectEntity } from './db/project.entity';
import { ProjectService } from './services/project.service';
import { ProjectColumnService } from './services/projectColumn.service';
import { ProjectColumnEntity } from './db/projectColumn.entity';
import { ProjectTaskEntity } from './db/projectTask.entity';
import { ProjectRepository } from './repositories/project.repository';
import { ProjectColumnRepository } from './repositories/projectColumn.repository';
import { ProjectController } from './controllers/project.controller';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, ProjectColumnEntity, ProjectTaskEntity])],
    providers: [ProjectService, ProjectColumnService, ProjectRepository, ProjectColumnRepository],
    controllers: [ProjectController],
    exports: [ProjectService],
})
export class ProjectModule {}
