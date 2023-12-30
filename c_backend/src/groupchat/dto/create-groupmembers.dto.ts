import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateGroupMembersDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  groupId: number;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  memberId: number;
}