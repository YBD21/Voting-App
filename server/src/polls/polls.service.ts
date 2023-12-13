import { Injectable } from '@nestjs/common'
import {
  CreatePollFields,
  JoinPollFields,
  RejoinPollFields,
} from './polls.types'
import { createPollId, createUserId } from './polls.ids'

@Injectable() // provide this service to module
export class PollsServices {
  async createPoll(fields: CreatePollFields) {
    const pollId = createPollId()
    const userId = createUserId()

    return {
      ...fields,
      pollId,
      userId,
    }
  }

  async joinPoll(fields: JoinPollFields) {
    const userId = createUserId()

    return {
      ...fields,
      userId,
    }
  }

  async reJoinPoll(fields: RejoinPollFields) {
    return fields
  }
}
