import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { CONNECTION, DATABASE_CONFIG } from '../utils/constants';
import { PoolManager } from './database-pool.service';

export const connectionFactory = {
  provide: CONNECTION,
  useFactory: async (optionsProvider: ConfigService, manager: PoolManager) => {
    const options = optionsProvider.get(DATABASE_CONFIG);
    const logger = new Logger('DatabaseModule');
    try {
      return await manager.getCreateIfNotExistClient(options);
    } catch (e) {
      logger.error(`Error creating connection pool: ${e.message}`);
    }
  },
  inject: [ConfigService, PoolManager],
};
