import { Body, Controller, Delete, Get, HttpException, HttpStatus, Param, ParseUUIDPipe, Post, Put, Query, UseGuards, UseInterceptors } from '@nestjs/common';
import AuthenticationGuard from 'src/endpoints/auth/guards/authentication.guard';
import { UserService } from 'src/endpoints/user/services/user.service';
import { LoggingInterceptor } from 'src/interceptors/logging.interceptor';
import { CreateTodoDTO } from '../dtos/create-todo.dto';
import { UpdateTodoDTO } from '../dtos/update-todo.dto';
import { TodoService } from '../services/todo.service';

@Controller('todo')
@UseGuards(AuthenticationGuard)
@UseInterceptors(LoggingInterceptor)
export class TodoController {
    constructor(private readonly todoService: TodoService,
        private readonly userService: UserService
        ) { }

    @Post()
    async create(@Body() body: CreateTodoDTO) {
        return this.todoService.create(body);
    }
    @Get()
    async findAll(@Query('s') searchString = null) {
        return this.todoService.findAll(searchString);
    }
    
    @Get('user/:id')
    async findAllByUser(@Param('id', ParseUUIDPipe) id: string) {
        const user = await this.userService.findByUnique;
        if (!user) {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return this.todoService.findAllByUser(id);
    }
    @Get(':id')
    async findById(@Param('id', ParseUUIDPipe) id: string) {
        const todo = await this.todoService.findByUnique(id);
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return todo;
    }
    @Put(':id')
    async update(@Body() body: UpdateTodoDTO,
        @Param('id', ParseUUIDPipe) id: string) {

        const todo = await this.todoService.findByUnique(id);
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return this.todoService.update(id, body);
    }
    @Delete(':id')
    async delete(@Param('id', ParseUUIDPipe) id: string) {
        const todo = await this.todoService.findByUnique(id);
        if (!todo) {
            throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
        }
        return this.todoService.delete(id);
    }
}
