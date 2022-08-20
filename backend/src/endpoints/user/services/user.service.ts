import { Inject, Injectable } from '@nestjs/common';
import { PoolClient } from 'pg';
import { CONNECTION } from 'src/constants';
import { CreateUserDTO } from '../dtos/create-user.dto';
import { User } from '../types/User.type';
import bcrypt from 'bcrypt';

@Injectable()
export class UserService {
    constructor(@Inject(CONNECTION) private readonly pgClient: PoolClient) { }

    async createUser(args: CreateUserDTO): Promise<User> {
        const { name, email, password } = args;
        const hashedPassword = await bcrypt.hash(password, 10);
        const query = 'INSERT INTO "User" (name, email, password) VALUES ($1, $2, $3) RETURNING *';
        const values = [name, email, hashedPassword];
        const { rows } = await this.pgClient.query(query, values);

        return rows[0];
    }
}
