import { ApiProperty } from '@nestjs/swagger';

export class ProjectColumnDto {
    @ApiProperty({})
    id: string;

    @ApiProperty({})
    name: string;

    @ApiProperty({})
    order: number;
}
