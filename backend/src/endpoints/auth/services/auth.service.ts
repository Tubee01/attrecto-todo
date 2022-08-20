import { Injectable } from '@nestjs/common';
import { UserService } from 'src/endpoints/user/services/user.service';
import bcrypt from 'bcrypt'
import { CreateUserDTO } from 'src/endpoints/user/dtos/create-user.dto';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { }
    async validateUser(username: string, pass: string): Promise<any> {
        const user = await this.userService.findByUnique(username, 'email');
        if (!user) {
            return null;
        }
        const isValidPW = await bcrypt.compare(pass, user.password);
        if (isValidPW) {
            const { password, ...result } = user;
            return result;
        }
        return null;
    }
    async registration(args: CreateUserDTO): Promise<any> {
        const { password, ...user } = await this.userService.create(args);
        return user;
    }
}
