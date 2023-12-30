import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { GroupchatService } from './groupchat.service';
import { CreateGroupchatDto } from './dto/create-groupchat.dto';
import { CreateGroupMembersDto } from './dto/create-groupmembers.dto';
import { UpdateGroupchatDto } from './dto/update-groupchat.dto';
import { BadRequestException } from '@nestjs/common';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('groupchat')
//@UseGuards(AuthGuard("local"))
@ApiTags('Group Chat')
@ApiSecurity('JWT-auth')
export class GroupchatController {
  constructor(private readonly groupchatService: GroupchatService) {}

  @Post('create-group')
  async create(@Body() createGroupchatDto: CreateGroupchatDto) {
    try {
      const createdGroup = await this.groupchatService.create(createGroupchatDto);
      return { message: 'Group created successfully', group: createdGroup };
    } catch (error) {
      return { message: 'Failed to create group', error: error.message };
    }
  }

  @Get('groups')
  async findAll() {
    try {
      const groups = await this.groupchatService.findAll();
      return { groups };
    } catch (error) {
      return { message: 'Failed to fetch groups', error: error.message };
    }
  }

  @Get('group/:id')
  async findOne(@Param('id') id: string) {
    try {
      const group = await this.groupchatService.findOne(+id);
      return { group };
    } catch (error) {
      return { message: 'Group not found', error: error.message };
    }
  }

  @Patch('update-group/:id')
  async update(@Param('id') id: string, @Body() updateGroupchatDto: UpdateGroupchatDto) {
    try {
      const updatedGroup = await this.groupchatService.update(+id, updateGroupchatDto);
      return { message: 'Group updated successfully', group: updatedGroup };
    } catch (error) {
      return { message: 'Failed to update group', error: error.message };
    }
  }

  @Post('invite/:groupId')
  async invite(@Param('groupId') groupId: string, @Body() createGroupMembersDto: CreateGroupMembersDto) {
    try {
      await this.groupchatService.invite(+groupId, createGroupMembersDto);
      return { message: 'User invited to the group successfully' };
    } catch (error) {
      if (error instanceof BadRequestException) {
        return { message: 'Failed to invite user to the group', error: error.message };
      }
      return { message: 'Internal server error', error: error.message };
    }
  }

  @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.groupchatService.remove(+id); // Parse id to a number
      return { message: 'Group deleted successfully' };
    } catch (error) {
      return { message: 'Failed to delete group', error: error.message };
    }
  }
  
  // @Get('group-members/:groupId')
  // async getGroupMembers(@Param('groupId') groupId: string) {
  //   try {
  //     const groupMembers = await this.groupchatService.getGroupMembers(+groupId);
  //     return { groupMembers };
  //   } catch (error) {
  //     return { message: 'Failed to fetch group members', error: error.message };
  //   }
  // }
}