import { ApiProperty } from '@nestjs/swagger';

export class TaskAssignedUserDto {
    @ApiProperty()
    id: string;

    @ApiProperty()
    name: string;
}
