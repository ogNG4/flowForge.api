import { ApiProperty } from '@nestjs/swagger';
import { BoardTaskDto } from './boardTaskDto';

export class SprintDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    number: number;

    @ApiProperty()
    goal: string;

    @ApiProperty()
    startDate: Date;

    @ApiProperty()
    endDate: Date;

    @ApiProperty()
    isActive: boolean;
}
