import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDate, IsOptional, IsString, IsUUID } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateSprintInputDto {
    @ApiProperty()
    @IsUUID()
    id: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    name?: string;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    startDate?: Date;

    @ApiProperty()
    @Type(() => Date)
    @IsDate()
    @IsOptional()
    endDate?: Date;

    @ApiProperty()
    @IsBoolean()
    @IsOptional()
    isActive?: boolean;
}
