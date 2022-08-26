import EmailService from 'src/email/email.service';
import { NestFactory } from '@nestjs/core';
import { EmailModule } from 'src/email/email.module';
import { Logger } from '@nestjs/common';

let service = null;
async function bootstrap() {
  const app = await NestFactory.create(EmailModule);
  const logger = new Logger(`Forked_${EmailModule.name}`);
  service = app.select(EmailModule).get(EmailService);
  if (!service) {
    process.send({ error: 'No connection' });
  }
  process.on('message', async (msg) => {
    try {
      const email = await service.sendMail(msg);
      process.send(email);
    } catch (e) {
      logger.error(e);
      process.send({ error: e.message });
    } finally {
      logger.log('Closing app');

      app.close();
    }
  });
}
bootstrap();
