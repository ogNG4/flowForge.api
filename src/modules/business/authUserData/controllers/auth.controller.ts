import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from '../services';
import { CreateAccountInputDto, SigInputDto, SignInDto } from '../types';
import { Response } from 'express';

@Controller('auth')
@ApiTags('Auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('sign-in')
    @HttpCode(HttpStatus.OK)
    @ApiResponse({ status: HttpStatus.OK, description: 'Sign in', type: SignInDto })
    async signIn(@Body() payload: SigInputDto, @Res() res: Response) {
        const accessToken = await this.authService.signIn(payload);
        const refreshToken = await this.authService.createRefreshToken(payload);
        res.cookie('refreshToken', refreshToken, { httpOnly: true, path: '/auth/refresh' });
        return res.send({ accessToken });
    }

    @Post('sign-up')
    @ApiResponse({ status: HttpStatus.OK, description: 'Sign in', type: SignInDto })
    async signUp(@Body() payload: CreateAccountInputDto) {
        return this.authService.createAccount(payload);
    }
}
