import { BoardTaskDto } from './boardTaskDto';
import { ApiProperty } from '@nestjs/swagger';

export class TaskDetailsDto extends BoardTaskDto {
    @ApiProperty()
    content: string;

    @ApiProperty()
    columnId: string;

    @ApiProperty()
    organizationId: string;
}
