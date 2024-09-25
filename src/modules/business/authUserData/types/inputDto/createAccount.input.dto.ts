import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsStrongPassword, MaxLength, MinLength } from 'class-validator';

export class CreateAccountInputDto {
    @ApiProperty()
    @IsEmail()
    @MaxLength(255)
    email: string;

    @ApiProperty()
    @IsString()
    @IsStrongPassword()
    password: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @MinLength(2)
    firstName: string;

    @ApiProperty()
    @IsString()
    @MaxLength(255)
    @MinLength(2)
    lastName: string;
}
