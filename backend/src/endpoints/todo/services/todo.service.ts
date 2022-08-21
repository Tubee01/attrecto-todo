import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { CONNECTION, USER } from 'src/utils/constants';
import { buildUpdateQuery } from 'src/database/helpers';
import { UserService } from 'src/endpoints/user/services/user.service';
import { User } from 'src/endpoints/user/types/User.type';
import { CreateTodoDTO } from '../dtos/create-todo.dto';

@Injectable()
export class TodoService {
  constructor(
    @Inject(CONNECTION) private readonly pgClient: PoolClient,
    private readonly userService: UserService,
    @Inject(USER) private readonly sessionUser: User,
  ) {}
  async create(body: CreateTodoDTO) {
    const {
      title,
      description = null,
      userId = this.sessionUser.id,
      dateTill = null,
      done = false,
    } = body;
    const user = await this.userService.findByUnique(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const query =
      'INSERT INTO "Todo" (title, description, user_id, date_till, done) VALUES ($1, $2, $3, $4, $5) RETURNING *';
    const values = [title, description, userId, dateTill, done];
    const { rows } = await this.pgClient.query(query, values);
    return rows[0];
  }
  async update(id: string, body: CreateTodoDTO) {
    const { title, description = undefined, userId, ...rest } = body;
    const user = await this.userService.findByUnique(
      userId || this.sessionUser.id,
    );
    if (!user) {
      throw new HttpException('User not found', HttpStatus.BAD_REQUEST);
    }
    const todo = await this.findByUnique(id);
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.BAD_REQUEST);
    }
    const { query, values } = buildUpdateQuery(
      'Todo',
      { title, description, ...rest },
      id,
    );
    const { rows } = await this.pgClient.query(query, values);

    return rows[0];
  }
  async findByUnique(id: string) {
    const query = 'SELECT * FROM "Todo" WHERE id = $1';
    const values = [id];
    const { rows } = await this.pgClient.query(query, values);
    return rows[0];
  }
  async findAll(searchString = null) {
    let query = 'SELECT * FROM "Todo"';
    if (searchString) {
      query += ' WHERE title ILIKE $1';
      const values = [`%${searchString}%`];
      const { rows } = await this.pgClient.query(query, values);
      return rows;
    }
    if (this.sessionUser.admin) {
      const { rows } = await this.pgClient.query(query);
      return rows;
    }
    return this.findAllByUser(this.sessionUser.id);
  }
  async findAllByUser(userId: string) {
    const query = 'SELECT * FROM "Todo" WHERE user_id = $1';
    const values = [userId];
    const { rows } = await this.pgClient.query(query, values);
    return rows;
  }
  async delete(id: string) {
    const query = 'DELETE FROM "Todo" WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await this.pgClient.query(query, values);
    return rows[0];
  }
}
