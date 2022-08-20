
import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger, Inject } from '@nestjs/common';
import { PoolClient } from 'pg';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { CONNECTION } from 'src/constants';


const logType = {
    POST: 'create',
    PUT: 'update',
    DELETE: 'delete',
    GET: 'read',
};
@Injectable()
export class LoggingInterceptor implements NestInterceptor {
    constructor(@Inject(CONNECTION) private readonly pgClient: PoolClient) { }
    async intercept(context: ExecutionContext, next: CallHandler) {
        const req = context.switchToHttp().getRequest();
        const { method, body, user, params } = req;
        const requestData = { body, params }
        const requestLog = await this.insertLog(method, `${context.getClass().name}_${context.getHandler().name}_REQUEST`, user.id, requestData)
        return next
            .handle()
            .pipe(
                tap(data => {
                    this.insertLog(method, `${context.getClass().name}_${context.getHandler().name}_RESPONSE`, user.id, data, requestLog);
                }),
                catchError(error => {
                    const { status, message } = error;
                    this.insertLog(method, `${context.getClass().name}_${context.getHandler().name}_ERROR`, user.id, { status, message }, requestLog);
                    throw error;
                }),
            );
    }
    //insert into log table
    async insertLog(method: string, handler: string, userId: string, data: { [key: string]: any } = {}, parentId: number = null) {
        let type = logType[method.toUpperCase()];
        const query = 'INSERT INTO "Log" (type, handler, data, user_id, parent_id) VALUES ($1, $2, $3, $4, $5) RETURNING *';
        const values = [type, handler, data ? { data } : null, userId, parentId];
        try {
            const { rows } = await this.pgClient.query(query, values);
            const { id } = rows[0];
            return id
        } catch (error) {
            const logger = new Logger(this.constructor.name);
            logger.error(error);
        }
        return null
    }
}