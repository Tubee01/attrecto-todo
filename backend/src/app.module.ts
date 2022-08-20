import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DatabaseModule } from './database/database.module';
import { EndpointsModule } from './endpoints/Endpoints.module';
import configuration from './config/configuration';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [configuration],
      isGlobal: true,
    }),
    DatabaseModule,
    EndpointsModule
  ],
})
export class AppModule { }
