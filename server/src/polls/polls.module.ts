import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { PollsController } from './polls.controller'
import { PollsServices } from './polls.service'

@Module({
  imports: [ConfigModule],
  controllers: [PollsController],
  providers: [PollsServices],
})
export class PollsModule {}
