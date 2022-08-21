import { Module } from '@nestjs/common';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { FileModule } from '../../file/file.module';
import { DatabaseModule } from 'src/database/database.module';

@Module({
  imports: [FileModule, DatabaseModule],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
