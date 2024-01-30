import { Controller, Get } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { ApiTags } from '@nestjs/swagger';

@Controller('user')
@ApiTags('Users')
export class UserController {
    constructor(private userService: UserService) {}
    @Get()
    findAll() {
        return this.userService.findAll();
    }
}
