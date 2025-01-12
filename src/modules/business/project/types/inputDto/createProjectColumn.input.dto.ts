import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateProjectColumnInputDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({})
    name: string;

    @IsString()
    @IsOptional()
    @ApiProperty({ nullable: true })
    previousColumnId: string;

    @IsNotEmpty()
    @ApiProperty()
    projectId: string;
}
