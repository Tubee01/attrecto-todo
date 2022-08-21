import { HttpException, Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { CONNECTION } from 'src/utils/constants';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../types/User.type';
import bcrypt from 'bcryptjs';
import { buildUpdateQuery } from 'src/database/helpers';

@Injectable()
export class UserService {
  constructor(@Inject(CONNECTION) private readonly pgClient: PoolClient) {}

  async create(args: CreateUserDTO): Promise<User> {
    const { name, email, password, admin = false } = args;
    const hashedPassword = await bcrypt.hash(password, 10);
    const query =
      'INSERT INTO "User" (name, email, password, admin) VALUES ($1, $2, $3 , $4) RETURNING *';
    const values = [name, email, hashedPassword, admin];
    try {
      const { rows } = await this.pgClient.query(query, values);
      return rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('Email already in use', 409);
      }
      throw new HttpException(error.message, 500);
    }
  }

  async findByUnique(value: string, unique = 'id'): Promise<User> {
    const query = `SELECT * FROM "User" WHERE ${unique} = $1`;
    const values = [value];
    const { rows } = await this.pgClient.query(query, values);
    return rows[0];
  }
  async update(id: string, args: CreateUserDTO): Promise<User> {
    const { name, email, password, admin = false } = args;
    let hashedPassword = undefined;
    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }
    const queryArgs = buildUpdateQuery(
      'User',
      { name, email, password: hashedPassword, admin },
      id,
    );
    const queryString = queryArgs.query;
    const values = queryArgs.values;
    try {
      const { rows } = await this.pgClient.query(queryString, values);
      return rows[0];
    } catch (error) {
      if (error.code === '23505') {
        throw new HttpException('Email already in use', 409);
      }
      throw new HttpException(error.message, 500);
    }
  }
  async findAll(searchString = null) {
    let query = 'SELECT * FROM "User"';

    if (searchString) {
      query += ' WHERE name ILIKE $1';
      const values = [`%${searchString}%`];
      const { rows } = await this.pgClient.query(query, values);
      return rows;
    }
    const { rows } = await this.pgClient.query(query);
    return (
      rows &&
      rows.map((row: User) => {
        const { password, ...rest } = row;
        return rest;
      })
    );
  }
  async delete(id: string) {
    const query = 'DELETE FROM "User" WHERE id = $1 RETURNING *';
    const values = [id];
    const { rows } = await this.pgClient.query(query, values);
    return rows[0];
  }
}
