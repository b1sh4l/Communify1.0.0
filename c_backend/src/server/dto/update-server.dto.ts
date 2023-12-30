import { PartialType } from '@nestjs/mapped-types';
import { CreateServerDto } from './create-server.dto';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateServerDto extends PartialType(CreateServerDto) {
    @ApiProperty()
    @IsNotEmpty({ message: 'Server name is required' })
    @IsString({ message: 'Server name must be a string' })
    serverName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Server type is required' })
    @IsString({ message: 'Server type must be a string' })
    serverType: string;
}
