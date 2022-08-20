import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { AuthController } from './controllers/auth.controller';
import { PassportModule } from '@nestjs/passport';

import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategies/local.strategy';
import SessionSerializer from './utils/serializer';

@Module({
  imports: [UserModule, PassportModule.register({ session: true })],
  providers: [AuthService, LocalStrategy, SessionSerializer],
  controllers: [AuthController],
  exports: [AuthService]
})
export class AuthModule { }
