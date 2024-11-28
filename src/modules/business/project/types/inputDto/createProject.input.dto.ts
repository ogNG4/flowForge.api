import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateProjectInputDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({})
    name: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({})
    code: string;

    @IsUUID()
    @IsNotEmpty()
    @ApiProperty({})
    organizationId: string;
}
