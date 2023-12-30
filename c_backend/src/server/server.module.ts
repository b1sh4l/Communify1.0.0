import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Server } from "src/server/entities/server.entity";
import { Channel } from "src/channel/entities/channel.entity";
import { Member } from "src/manage-user/entities/manage-user.entity";
//import { ServerChannels } from "src/server/entities/serverchannel.entity";
import { ServerMembers } from 'src/server/entities/servermembers.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Server, Member, Channel, ServerMembers])],
  controllers: [ServerController],
  providers: [ServerService],
})
export class ServerModule {}
