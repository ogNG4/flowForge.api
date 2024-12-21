import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString, IsUUID } from 'class-validator';
import { TaskPriority } from '~/types/domain';

export class CreateTaskInputDto {
    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    name: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    content: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    projectId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    @IsUUID()
    columnId: string;

    @ApiProperty({ type: String })
    @IsNotEmpty()
    @IsString()
    priority: TaskPriority;

    @ApiProperty({ type: String, required: false })
    @IsOptional()
    assignedUserId: string;

    @ApiProperty({ type: Number, required: false })
    @IsOptional()
    estimatedTime: number;
}
