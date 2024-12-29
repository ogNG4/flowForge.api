import { ApiProperty } from '@nestjs/swagger';
import { ProjectColumnWithTasksDto } from './projectColumnWithTasksDto';

export class ProjectBoardDto {
    @ApiProperty({ type: [ProjectColumnWithTasksDto] })
    columns: ProjectColumnWithTasksDto[];

    @ApiProperty()
    organizationId: string;

    @ApiProperty()
    name: string;
}
