import { ApiProperty } from '@nestjs/swagger';

export class VerifyAccountDto {
    @ApiProperty({ example: false })
    accountExists: boolean;

    @ApiProperty({ example: false })
    accountConfigured: boolean;
}
