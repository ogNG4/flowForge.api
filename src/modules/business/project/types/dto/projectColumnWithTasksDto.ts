import { ApiProperty } from '@nestjs/swagger';
import { BoardTaskDto } from './boardTaskDto';
import { ProjectColumnDto } from './projectColumn.dto';

export class ProjectColumnWithTasksDto extends ProjectColumnDto {
    @ApiProperty({ type: [BoardTaskDto] })
    tasks: BoardTaskDto[];
}
