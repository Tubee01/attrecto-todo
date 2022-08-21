import {
  Inject,
  Logger,
  MiddlewareConsumer,
  Module,
  NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EndpointsModule } from './endpoints/endpoints.module';
import { FileModule } from './file/file.module';
import configuration from './config/configuration';
import passport from 'passport';
import session from 'express-session';
import { APP_SECRET, CONNECTION } from './utils/constants';
import { PoolClient } from 'pg';
import { ScheduleModule } from '@nestjs/schedule';
import { TasksModule } from './tasks/tasks.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [configuration],
      isGlobal: true,
    }),
    ScheduleModule.forRoot(),
    DatabaseModule,
    EndpointsModule,
    TasksModule,
    FileModule,
  ],
  providers: [Logger],
})
export class AppModule implements NestModule {
  constructor(
    private readonly config: ConfigService,
    @Inject(CONNECTION) private readonly pgClient: PoolClient,
  ) {}
  configure(consumer: MiddlewareConsumer) {
    const pgSession = require('connect-pg-simple')(session);
    consumer
      .apply(
        session({
          store: new pgSession({
            pool: this.pgClient,
            tableName: 'user_sessions',
          }),
          secret: this.config.get(APP_SECRET),
          resave: false,
          saveUninitialized: false,
          cookie: {
            sameSite: false,
            httpOnly: false,
            // 1 hour maxAge
            maxAge: 1000 * 60 * 60,
          },
        }),
        passport.initialize(),
        passport.session(),
      )
      .forRoutes('/');
  }
}
