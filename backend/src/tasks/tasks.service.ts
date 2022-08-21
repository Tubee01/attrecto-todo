// tslint:disable:no-var-requires
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PoolClient } from 'pg';
import { Cron } from '@nestjs/schedule';
import { CONNECTION, CRON_ENABLED } from 'src/utils/constants';
const { fork } = require('child_process');
const path = require('path');
@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);
  constructor(
    private readonly config: ConfigService,
    @Inject(CONNECTION) private readonly pgClient: PoolClient,
  ) { }
  async onModuleInit() {
    this.logger.log('TasksService is initialized');
  }
  @Cron('00 * * * * *')
  handleCron() {
    if (!this.config.get(CRON_ENABLED) === false) {
      return;
    }
    this.logger.log('Cron is running');
    this.logger.debug('Called when the current second is 60');
    const main_fork = fork(path.join(__dirname, './must-notify.js'));
    main_fork.on('message', (msg) => {
      if (msg.length > 0) {
        msg.forEach((email) => {
          this.handleEmail(email);
        });
      }
      main_fork.kill();
    });
    main_fork.on('error', (err) => {
      this.logger.error(err);
      main_fork.kill();
    });
    main_fork.send({ notifyBefore: this.config.get('notifyBefore') });
  }

  handleEmail(msg) {
    const { todoId, userId, emailData } = msg;
    const email_fork = fork(path.join(__dirname, './send-notification.js'));
    email_fork.on('message', (sub_msg) => {
      if (sub_msg.error) {
        this.logger.error(sub_msg.error);
      }
      if (sub_msg.messageId) {
        this.saveNotification(todoId, userId);
        this.logger.log(
          `Notification for todo ${todoId} and user ${userId} sent`,
        );
      }
      email_fork.kill();
    });
    email_fork.on('error', (err) => {
      this.logger.error(err);
      email_fork.kill();
    });
    email_fork.send(emailData);
  }
  async saveNotification(todoId: string, userId: string) {
    try {
      const rows = await this.pgClient.query(
        'INSERT INTO "Notification" ("todo_id", "user_id") VALUES ($1, $2) RETURNING *',
        [todoId, userId],
      );
      return rows;
    } catch (err) {
      this.logger.error(err);
    }
  }
}
