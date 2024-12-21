import { BoardTaskDto } from './boardTaskDto';
import { ApiProperty } from '@nestjs/swagger';
import { TaskTimeLogDto } from './taskTimeLogDto';

export class TaskDetailsDto extends BoardTaskDto {
    @ApiProperty()
    content: string;

    @ApiProperty()
    columnId: string;

    @ApiProperty()
    organizationId: string;

    @ApiProperty()
    timeLogs: TaskTimeLogDto[];

    @ApiProperty()
    totalTimeSpent: number;

    @ApiProperty()
    estimatedTime: number;
}
