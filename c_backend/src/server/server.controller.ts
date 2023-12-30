import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { BadRequestException } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('server')
@ApiTags('Server')
@ApiSecurity('JWT-auth')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post('create-server')
  create(@Body() createServerDto: CreateServerDto) {
    if (!createServerDto || !createServerDto.serverName) {
      throw new BadRequestException('Server name is required.');
    }
    return this.serverService.create(createServerDto);
  }

  @Get()
  findAll() {
    return this.serverService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.serverService.findOne(+id);
  }

  // @Patch('update-server-name/:id')
  // update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
  //   return this.serverService.update(+id, updateServerDto);
  // }


  @Patch('update-server-name/:id')
  updateServerName(@Param('id') id: string, @Body('newServerName') newServerName: string) {
    return this.serverService.updateServerName(+id, newServerName);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.serverService.remove(+id);
  }

  @Post(':id/invite-member')
  inviteMember(
    @Param('id') serverId: number,
    @Body('memberId') memberId: number,
    @Body('role') role: string,
  ) {
    return this.serverService.inviteMember(+serverId, +memberId, role);
  }

  @Get(':id/members')
  getMembers(@Param('id') serverId: number) {
    return this.serverService.getMembers(serverId);
  }
}
