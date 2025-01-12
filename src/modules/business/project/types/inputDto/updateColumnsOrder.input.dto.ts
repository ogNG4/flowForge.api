import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UpdateColumnsOrderInputDto {
    @IsNotEmpty()
    @ApiProperty({
        type: [
            {
                id: { type: 'string' },
                order: { type: 'number' },
            },
        ],
    })
    columns: { id: string; order: number }[];
}
