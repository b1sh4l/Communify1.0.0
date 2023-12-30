import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsEmail, IsString, IsBoolean } from 'class-validator';

export class UpdateManageUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  lastname: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  mobileno: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  profile_picture?: string;

  @ApiProperty()
  @IsNotEmpty()
  member_since: Date;

  @ApiProperty()
  role?: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  is_banned: boolean;
}
