import { Injectable, UnauthorizedException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../db';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateAccountInputDto, SigInputDto } from '../types';
import { ConflictException } from '@nestjs/common';
import { UserService } from './user.service';
import * as crypto from 'crypto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { AccessToken } from '~/modules/utils/auth/types/token';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserEntity) private userRepo: Repository<UserEntity>,
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    createSalt() {
        return crypto.randomBytes(32).toString('hex');
    }

    createHash(password: string, salt: string) {
        const hash = crypto
            .createHash('sha512')
            .update(password + salt)
            .digest('hex');

        return hash;
    }

    async createAccesToken(payload: any) {
        return this.jwtService.signAsync(payload, { expiresIn: '1d' });
    }

    async createRefreshToken(payload: any) {
        return this.jwtService.signAsync(payload, { expiresIn: '7d' });
    }

    async createAccount(payload: CreateAccountInputDto) {
        const emailExists = await this.userService.findOneByEmail(payload.email);
        if (emailExists) throw new ConflictException('User already exist');

        const salt = this.createSalt();
        const hash = this.createHash(payload.password, salt);

        const user = this.userRepo.create({
            ...payload,
            password: hash,
            salt,
        });

        return this.userRepo.save(user);
    }

    async signIn(payload: SigInputDto) {
        const user = await this.userService.findOneByEmail(payload.email);
        if (!user) throw new UnauthorizedException('Invalid credentials');
        const hash = this.createHash(payload.password, user.salt);
        const isPasswordCorrect = hash === user.password;

        if (!user.isActive || !isPasswordCorrect) throw new UnauthorizedException('Invalid credentials');

        const tokenPayload: AccessToken = {
            id: user.id,
            email: user.email,
        };
        const accessToken = await this.jwtService.signAsync(tokenPayload, { expiresIn: '1d' });

        return accessToken;
    }

    async signOut(res: Response) {
        res.clearCookie('refreshToken', { path: '/auth/refresh' });
    }
}
