import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body() body: CreateUserDTO) {
        return this.userService.createUser(body);
    }
}
