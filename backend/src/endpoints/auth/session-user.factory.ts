import { Request } from 'express';
import { REQUEST } from '@nestjs/core';
import { User } from '../user/types/User.type';
import { USER } from 'src/utils/constants';

export const sessionUserFactory = [
  {
    provide: USER,
    useFactory: (request: Request): User | boolean => {
      return request.isAuthenticated() ? (request.user as User) : false;
    },
    inject: [REQUEST],
  },
];
