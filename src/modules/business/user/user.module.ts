import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './db/user.entity';
import { UserController } from './controllers/user.contoller';
import { UserService } from './services/user.service';

@Module({
    imports: [TypeOrmModule.forFeature([UserEntity])],
    providers: [UserService],
    controllers: [UserController],
})
export class UserModule {}
