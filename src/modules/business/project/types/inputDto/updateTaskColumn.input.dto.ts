import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsUUID } from 'class-validator';

export class UpdateTaskColumnInputDto {
    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    taskId: string;

    @ApiProperty()
    @IsUUID()
    @IsNotEmpty()
    columnId: string;

    @ApiPropertyOptional()
    @IsOptional()
    aboveTaskId: string | null;
}
