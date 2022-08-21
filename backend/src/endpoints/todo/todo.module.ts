import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/database/database.module';
import { sessionUserFactory } from '../auth/session-user.factory';
import { UserModule } from '../user/user.module';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';

@Module({
  imports: [UserModule, DatabaseModule],
  controllers: [TodoController],
  providers: [TodoService, ...sessionUserFactory],
  exports: [TodoService],
})
export class TodoModule {}
