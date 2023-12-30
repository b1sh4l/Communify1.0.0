import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateDirectmessageDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  senderId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsInt()
  receiverId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  messageContent: string;
}
