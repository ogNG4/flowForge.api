import { ApiProperty } from '@nestjs/swagger';

export class NewestTaskDto {
    @ApiProperty({ type: String })
    id: string;

    @ApiProperty({ type: String })
    code: string;
}
