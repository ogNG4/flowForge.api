import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSprintInputDto {
    @ApiProperty()
    @IsString()
    name: string;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    startDate: Date;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    endDate: Date;

    @ApiProperty()
    @IsUUID()
    projectId: string;

    @ApiProperty()
    @IsBoolean()
    isActive: boolean;
}
