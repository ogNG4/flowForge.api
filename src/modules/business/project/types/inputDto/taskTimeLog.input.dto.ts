import { ApiProperty } from '@nestjs/swagger';

export class TaskTimeLogInputDto {
    @ApiProperty({ type: String })
    taskId: string;

    @ApiProperty({ type: Number })
    timeSpent: number;

    @ApiProperty({ type: String, required: false })
    description?: string;
}
