import { UseGuards, Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ChannelService } from './channel.service';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('channel')
@ApiTags("Channel")
@ApiSecurity('JWT-auth')
export class ChannelController {
  constructor(private readonly channelService: ChannelService) {}

  @Post('create-channel')
  async create(@Body() createChannelDto: CreateChannelDto) {
    try {
      const createdChannel = await this.channelService.create(createChannelDto);
      return { success: true, data: createdChannel };
    } catch (error) {
      return { success: false, error: error.message };
    }
    //return this.channelService.create(createChannelDto);
  }

  @Get('channel-list')
  async findAll() {
    try {
      const channels = await this.channelService.findAll();
      return { success: true, data: channels };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
  
  @Get('channel/:id')
  async findOne(@Param('id') id: string) {
    try {
      const channel = await this.channelService.findOne(+id);
      return { success: true, data: channel };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  @Patch('update-channel/:id')
  async update(@Param('id') id: string, @Body() updateChannelDto: UpdateChannelDto) {
    try {
      const updatedChannel = await this.channelService.update(+id, updateChannelDto);
      return { success: true, data: updatedChannel };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }


 @Delete('delete/:id')
  async remove(@Param('id') id: string) {
    try {
      await this.channelService.remove(+id);
      return { success: true, message: 'Channel deleted successfully' };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }
}
