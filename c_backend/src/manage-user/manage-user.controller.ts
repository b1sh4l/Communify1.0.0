import { Controller, Get, Put, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { ManageUserService } from './manage-user.service';
import { CreateManageUserDto } from './dto/create-manage-user.dto';
import { UpdateManageUserDto } from './dto/update-manage-user.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import * as bcrypt from 'bcrypt';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('manage-user')
@ApiTags('Manage User')
@ApiSecurity("JWT-auth")
export class ManageUserController {
  constructor(private readonly manageUserService: ManageUserService) {}

  private async hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return bcrypt.hash(password, saltRounds);
  }

  @Post('create')
  async create(@Body() createManageUserDto: CreateManageUserDto) {
    const hashedPassword = await this.hashPassword(createManageUserDto.password);
    const user = { ...createManageUserDto, password: hashedPassword };
    return this.manageUserService.create(user);
    //return this.manageUserService.create(createManageUserDto);
  }


  @Get()
  findAll() {
    return this.manageUserService.findAll();
  }

  @Get('find/:id')
  findOne(@Param('id') id: string) {
    return this.manageUserService.findOne(+id);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateManageUserDto: UpdateManageUserDto) {
    return this.manageUserService.update(+id, updateManageUserDto);
  }

  @Delete('delete/:id')
  remove(@Param('id') id: string) {
    return this.manageUserService.remove(+id);
  }
  @Put('edit-username/:id')
  editUsername(@Param('id') id: string, @Body('newUsername') newUsername: string) {
    return this.manageUserService.editUsername(+id, newUsername);
  }

  @Put('remove-profile-picture/:id')
  removeProfilePicture(@Param('id') id: string) {
    return this.manageUserService.removeProfilePicture(+id);
  }

  @Patch('assign-role/:id')
  assignRole(@Param('id') id: string, @Body('newRole') newRole: string) {
    return this.manageUserService.assignRole(+id, newRole);
  }



  @Put('limit-user-actions/:id')
  limitUserActions(@Param('id') id: string, @Body('restrictions') restrictions: string[]) {
    return this.manageUserService.limitUserActions(+id, restrictions);
  }

  @Put('ban-user/:id')
  banUser(@Param('id') id: string) {
    return this.manageUserService.banUser(+id);
  }

  @Get(':email')
  findByEmail(@Param('email') email: string) {
    return this.manageUserService.getMemberByEmail(email);
  }
}
