import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { FileModule } from '../../file/file.module';

@Module({
  imports: [FileModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService]
})
export class UserModule { }
