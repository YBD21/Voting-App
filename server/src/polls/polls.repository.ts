import { Inject, Injectable, Logger } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { Redis } from 'ioredis'
import { IORedisKey } from 'src/redis.module'

/**
 * Repository responsible for poll data operations with Redis
 */
@Injectable()
export class PollsRepository {
  // Logger instance for this repository
  private readonly logger = new Logger(PollsRepository.name)
  
  // Time-to-live setting for polls, defaults to '24h' if not configured
  private readonly ttl: string

  /**
   * Creates an instance of PollsRepository
   * @param configService - Service to access application configuration
   * @param redisClient - Redis client for data storage operations
   */
  constructor(
    private readonly configService: ConfigService,
    @Inject(IORedisKey) private readonly redisClient: Redis,
  ) {
    // Initialize TTL from configuration with fallback to default value
    this.ttl = this.configService.get<string>('POLL_DURATION') || '24h'
  }
}
