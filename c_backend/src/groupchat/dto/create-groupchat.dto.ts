import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGroupchatDto 
{
    
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    groupName: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    groupType: string;
}
