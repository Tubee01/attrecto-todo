import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configuration from 'src/config/configuration';
import { CONNECTION } from '../utils/constants';
import { PoolManager } from './database-pool.service';
import { connectionFactory } from './database.provider';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      load: [configuration],
    }),
  ],
  providers: [PoolManager, connectionFactory],
  exports: [CONNECTION],
})
export class DatabaseModule {}
