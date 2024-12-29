import { ApiProperty } from '@nestjs/swagger';
import { TaskAssignedUserDto } from './taskAssignedUser.dto';

class UserTimeEntryDto {
    @ApiProperty({ type: TaskAssignedUserDto })
    user: TaskAssignedUserDto;

    @ApiProperty({ type: Number })
    timeSpent: number;
}

class TaskTimeEntryDto {
    @ApiProperty({ type: String })
    taskId: string;

    @ApiProperty({ type: String })
    taskCode: string;

    @ApiProperty({ type: Number })
    timeSpent: number;
}

export class TaskWithUsersTimeDto {
    @ApiProperty({ type: String })
    taskId: string;

    @ApiProperty({ type: String })
    taskCode: string;

    @ApiProperty({ type: [UserTimeEntryDto] })
    userTimes: UserTimeEntryDto[];

    @ApiProperty({ type: Number })
    totalTimeSpent: number;
}

export class UserWithTasksTimeDto {
    @ApiProperty({ type: TaskAssignedUserDto })
    user: TaskAssignedUserDto;

    @ApiProperty({ type: [TaskTimeEntryDto] })
    taskTimes: TaskTimeEntryDto[];

    @ApiProperty({ type: Number })
    totalTimeSpent: number;
}

export class ProjectTimeSpentDto {
    @ApiProperty({ type: String })
    projectId: string;

    @ApiProperty({ type: String })
    projectName: string;

    @ApiProperty({ type: [UserWithTasksTimeDto] })
    userStats: UserWithTasksTimeDto[];

    @ApiProperty({ type: [TaskWithUsersTimeDto] })
    taskStats: TaskWithUsersTimeDto[];

    @ApiProperty({ type: Number })
    totalTimeSpent: number;
}
