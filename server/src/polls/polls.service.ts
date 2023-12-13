import { Injectable } from '@nestjs/common'
import {
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './polls.types'

@Injectable() // provide this service to module
export class PollsServices {
  async createPoll(fields: CreatePollFields) {}

  async joinPoll(fields: JoinPollFields) {}

  async reJoinPoll(fields: RejoinPollFields) {}
}
