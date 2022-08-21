import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CONNECTION } from 'src/utils/constants';
import { DatabaseModule } from 'src/database/database.module';

let service = null;
async function bootstrap() {
  const app = await NestFactory.create(DatabaseModule);
  const logger = new Logger(`Forked_${DatabaseModule.name}`);
  service = app.select(DatabaseModule).get(CONNECTION);
  if (!service) {
    process.send({ error: 'No connection' });
  }
  process.on('message', async (msg) => {
    try {
      const emailDatas = await sendNotification(msg.notifyBefore);
      process.send(emailDatas);
    } catch (e) {
      process.send({ error: e.message });
    } finally {
      logger.log('Closing app');
      app.close();
    }
  });
}
const sendNotification = async (notifyBefore = 3600000) => {
  const data = [];
  const { rows } = await service.query('SELECT * FROM "Todo" ');
  // one notification per day and todo is due in 1 hour
  const todos = rows.filter(
    (todo) =>
      todo.date_till &&
      todo.date_till.getTime() - new Date().getTime() <= notifyBefore,
  );
  await Promise.all(
    todos.map(async (todo) => {
      const notification = await service.query(
        `SELECT * FROM "Notification" WHERE "todo_id" = $1 AND  "user_id" = $2`,
        [todo.id, todo.user_id],
      );
      if (!notification.rows.length) {
        const { rows } = await service.query(
          `SELECT * FROM "User" WHERE "id" = $1 `,
          [todo.user_id],
        );
        const user = rows[0];
        if (user.email) {
          const emailData = {
            to: user.email,
            subject: 'Todo reminder',
            text: `Hello, ${user.name}!\n\nYou have a todo ${
              todo.title
            } that is due in ${new Date(
              todo.date_till.getTime() - new Date().getTime(),
            ).getMinutes()} minutes.\n\nBest regards,\n Todo App`,
          };
          data.push({ todoId: todo.id, userId: todo.user_id, emailData });
        }
      }
    }),
  );
  return data;
};
bootstrap();
