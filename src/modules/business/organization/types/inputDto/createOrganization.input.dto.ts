import { ApiProperty } from '@nestjs/swagger';
import { MaxLength } from 'class-validator';

export class CreateOrganizationInputDto {
    @ApiProperty({ maxLength: 50 })
    @MaxLength(50)
    name: string;
}
