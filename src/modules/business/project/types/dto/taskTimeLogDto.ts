import { ApiProperty } from '@nestjs/swagger';
import { TaskAssignedUserDto } from './taskAssignedUser.dto';

export class TaskTimeLogDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    timeSpent: number;

    @ApiProperty()
    logDate: Date;

    @ApiProperty()
    description: string;

    @ApiProperty()
    user: TaskAssignedUserDto;
}
