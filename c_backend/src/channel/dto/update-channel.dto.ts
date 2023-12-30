import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateChannelDto } from './create-channel.dto';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class UpdateChannelDto extends PartialType(CreateChannelDto) { @IsString()
    @ApiProperty()
    @MaxLength(255)
    channel_name: string;
  
    @ApiProperty()
    @IsString()
    @MaxLength(50)
    channel_type: string;
  }