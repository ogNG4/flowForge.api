import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SignInDto {
    @IsString()
    @ApiProperty({ required: true })
    accessToken: string;
}
