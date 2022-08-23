import { Injectable } from '@nestjs/common';
import { PassportSerializer } from '@nestjs/passport';
import { UserService } from 'src/endpoints/user/services/user.service';
import { User } from 'src/endpoints/user/types/User.type';
import { Done } from './types';

@Injectable()
export default class SessionSerializer extends PassportSerializer {
  constructor(private readonly userService: UserService) {
    super();
  }

  serializeUser(user: User, done: Done) {
    done(null, user);
  }
  async deserializeUser(user: User, done: Done) {
    const userDB = await this.userService.findByUnique(
      user.id,
    );
    if (userDB) {
      const { password, ...user } = userDB;
      return done(null, user);
    }
    return done(null, null);
  }
}
