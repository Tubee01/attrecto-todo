import { Module } from '@nestjs/common';
import { sessionUserFactory } from '../auth/session-user.factory';
import { UserModule } from '../user/user.module';
import { TodoController } from './controllers/todo.controller';
import { TodoService } from './services/todo.service';

@Module({
  imports: [UserModule],
  controllers: [TodoController],
  providers: [TodoService, ...sessionUserFactory],
  exports: [TodoService],
})
export class TodoModule { }
