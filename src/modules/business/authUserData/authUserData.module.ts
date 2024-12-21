import { JwtModule } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './db/user.entity';
import { UserController } from './controllers/user.contoller';
import { AuthService, UserService } from './services';
import { AuthController } from './controllers';

@Module({
    imports: [
        TypeOrmModule.forFeature([UserEntity]),
        JwtModule.register({
            secret: 'secret',
            signOptions: { expiresIn: '7d' },
        }),
    ],
    providers: [UserService, AuthService],
    controllers: [UserController, AuthController],
})
export class AuthUserDataModule {}
