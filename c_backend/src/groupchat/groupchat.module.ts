import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GroupChat } from 'src/groupchat/entities/groupchat.entity';
import { GroupMembers } from 'src/groupchat/entities/groupmembers.entity';
import { GroupchatService } from './groupchat.service';
import { GroupchatController } from './groupchat.controller';

@Module({
  imports :  [TypeOrmModule.forFeature([GroupChat, GroupMembers])],
  controllers: [GroupchatController],
  providers: [GroupchatService],
})
export class GroupchatModule {}
