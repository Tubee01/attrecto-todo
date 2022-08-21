import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { API_PORT } from './utils/constants';
const { fork } = require('child_process');
const path = require('path');
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);
  const config = app.get(ConfigService);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  // Database user seed
  const seed_fork = fork(path.join(__dirname, './database/seed.js'));
  seed_fork.on('message', (msg) => {
    if (msg.error) {
      logger.error(msg.error);
    }
    if (msg.message) {
      logger.log(msg.message);
    }
    seed_fork.kill();
  });
  seed_fork.on('error', (err) => {
    logger.error(err);
    seed_fork.kill();
  });
  seed_fork.send({});
  await app.listen(config.get(API_PORT));
  logger.log(`I'm listening on ${await app.getUrl()}`);
}
bootstrap();
