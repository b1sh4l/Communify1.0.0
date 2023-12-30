import { ApiProperty } from '@nestjs/swagger';
import { PartialType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString } from 'class-validator';
import { CreateGroupchatDto } from './create-groupchat.dto';

export class UpdateGroupchatDto extends PartialType(CreateGroupchatDto) {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    groupName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    groupType: string;
}
