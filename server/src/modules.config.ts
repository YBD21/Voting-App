import { Logger } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { RedisModule } from './redis.module'

export const redisModule = RedisModule.registerAsync({
  imports: [ConfigModule],
  useFactory: async (ConfigService: ConfigService) => {
    const logger = new Logger('RedisModule')

    return {
      connectionOptions: {
        host: ConfigService.get('REDIS_HOST'),
        port: ConfigService.get('REDIS_PORT'),
      },
      onClientReady: (client) => {
        logger.log('Redis client ready')

        client.on('error', (err) => {
          logger.error('Redis Client Error: ', err)
        })

        client.on('connect', () => {
          logger.log(
            `Connected to redis on ${client.options.host}:${client.options.port}`,
          )
        })
      },
    }
  },
  inject: [ConfigService],
})

