import { ApiProperty } from '@nestjs/swagger';
import { TaskAssignedUserDto } from './taskAssignedUser.dto';
import { TaskPriority } from '~/types/domain';

export class BoardTaskDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;

    @ApiProperty()
    code: string;

    @ApiProperty()
    assignedUser: TaskAssignedUserDto;

    @ApiProperty()
    priority: TaskPriority;

    @ApiProperty()
    aboveTaskId: string | null;
}
