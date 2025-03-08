import {
  DynamicModule,
  FactoryProvider,
  Module,
  ModuleMetadata,
} from '@nestjs/common';
import IORedis, { Redis, RedisOptions } from 'ioredis';

export const IORedisKey = 'IORedis';

export interface RedisModuleOptions {
  connectionOptions: RedisOptions;
  onClientReady?: (client: Redis) => void;
}

export interface RedisAsyncModuleOptions {
  useFactory: (...args: any[]) => Promise<RedisModuleOptions> | RedisModuleOptions;
  imports?: Pick<ModuleMetadata, 'imports'>['imports'];
  inject?: FactoryProvider['inject'];
}

@Module({})
export class RedisModule {
  static registerAsync({
    useFactory,
    imports,
    inject,
  }: RedisAsyncModuleOptions): DynamicModule {
    const redisProvider = {
      provide: IORedisKey,
      useFactory: async (...args: any[]) => {
        const { connectionOptions, onClientReady } = await useFactory(...args);
        const client = new IORedis(connectionOptions);
        
        onClientReady?.(client);
        
        return client;
      },
      inject,
    };

    return {
      module: RedisModule,
      imports,
      providers: [redisProvider],
      exports: [redisProvider],
    };
  }
}
