import {
IsString,
Length,
    Min,
    Max,
  } from 'class-validator';
// Dto = Data Transfer Object
export class CreatePollDto {
@IsString()
@Length(1,100)
topic: string;
}