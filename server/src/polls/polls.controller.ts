import { Body, Controller, Post } from '@nestjs/common'
import { CreatePollDto, JoinPollDto } from './dtos'
import { PollsServices } from './polls.service'

@Controller('polls')
export class PollsController {
  constructor(private pollService: PollsServices) {}
  // access dependency
  @Post()
  async create(@Body() createPollDto: CreatePollDto) {
    const result = await this.pollService.createPoll(createPollDto)
    return result
  }

  @Post('/join')
  async join(@Body() joinPollDto: JoinPollDto) {
    const result = await this.pollService.joinPoll(joinPollDto)
    return result
  }
  @Post('/rejoin')
  async rejoin() {
    const result = await this.pollService.reJoinPoll({
      name: 'from token',
      pollId: 'Also from token',
      userId: 'Guess Where This comes From ? Thats Right ! from token',
    })
    return result
  }
}
