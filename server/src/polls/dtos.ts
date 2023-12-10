import {
IsString,
Length,
IsInt,
Min,
Max
  } from 'class-validator';
// Dto = Data Transfer Object
export class CreatePollDto {
@IsString()
@Length(1,100)
topic: string;

@IsInt()
@Min(1)
@Max(5)
votesPerPerson:number;

@IsString()
@Length(1,25)
name:string;
}

export class JoinPollDto {
 @IsString()
 @Length(6,6)
 pollId:string;

 @IsString()
 @Length(1,25)
 name:string;
}