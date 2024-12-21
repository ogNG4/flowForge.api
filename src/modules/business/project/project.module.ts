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
import { ProjectBoardController } from './controllers/projectBoard.controller';
import { ProjectBoardService } from './services/projectBoard.service';
import { ProjectTaskController } from './controllers/projectTask.controller';
import { ProjectTaskService } from './services/projectTask.service';
import { ProjectTaskRepository } from './repositories/projectTask.repository';
import { TaskTimeLogEntity } from './db/taskTimeLog.entity';
import { TaskTimeLogRepository } from './repositories/taskTimeLog.repository';

@Module({
    imports: [TypeOrmModule.forFeature([ProjectEntity, ProjectColumnEntity, ProjectTaskEntity, TaskTimeLogEntity])],
    providers: [
        ProjectService,
        ProjectColumnService,
        ProjectRepository,
        ProjectColumnRepository,
        ProjectBoardService,
        ProjectTaskService,
        ProjectTaskRepository,
        TaskTimeLogRepository,
    ],
    controllers: [ProjectController, ProjectBoardController, ProjectTaskController],
    exports: [ProjectService],
})
export class ProjectModule {}
