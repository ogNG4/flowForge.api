import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from '../db/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
    constructor(@InjectRepository(UserEntity) private userRepo: Repository<UserEntity>) {}

    findAll() {
        console.log(process.env.DB_PASSWORD);
        return this.userRepo.find();
    }

    async findOneByEmail(email: string) {
        return this.userRepo.findOneBy({ email });
    }
}
