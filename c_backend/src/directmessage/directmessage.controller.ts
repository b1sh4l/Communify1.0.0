import { UseGuards, Controller, Get, Post, Patch, Body, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { DirectmessageService } from './directmessage.service';
import { CreateDirectmessageDto } from './dto/create-directmessage.dto';
import { UpdateDirectmessageDto } from './dto/update-directmessage.dto';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@UseGuards(JwtAuthGuard)
@Controller('directmessage')
@ApiTags('Direct Messages')
@ApiSecurity('JWT-auth')
export class DirectmessageController {
  constructor(private readonly directmessageService: DirectmessageService) {}

  @Post()
  @UsePipes(ValidationPipe) 
  create(@Body() createDirectmessageDto: CreateDirectmessageDto) {
    //console.log(createDirectmessageDto);
    return this.directmessageService.create(createDirectmessageDto);
  }

  @Get()
  findAll() {
    return this.directmessageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.directmessageService.findOne(+id);
  }

  @Get('messages/sender/:senderId')
  getMessagesBySenderId(@Param('senderId') senderId: string) {
    return this.directmessageService.getMessagesBySenderId(+senderId);
  }

  @Get('messages/receiver/:receiverId')
  getMessagesByReceiverId(@Param('receiverId') receiverId: string) {
    return this.directmessageService.getMessagesByReceiverId(+receiverId);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.directmessageService.remove(+id);
  }
}
