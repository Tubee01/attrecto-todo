import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { API_PORT } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger(bootstrap.name);
  const config = app.get(ConfigService);
  app.useGlobalPipes(new ValidationPipe());




  await app.listen(config.get(API_PORT));
  logger.log(`I'm listening on ${await app.getUrl()}`);
}
bootstrap();
