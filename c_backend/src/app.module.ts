import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManageUserModule } from './manage-user/manage-user.module';
import { ServerModule } from './server/server.module';
import { ChannelModule } from 'src/channel/channel.module';
import { GroupchatModule } from './groupchat/groupchat.module';
import { DirectmessageModule } from './directmessage/directmessage.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule  } from './auth/auth.module';



//JWT: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InN1ZGFyc2hhbkBnbWFpbC5jb20iLCJzdWIiOjIyLCJpYXQiOjE3MDAzMzUzNjAsImV4cCI6MTcwMDQyMTc2MH0.XRV-Tp7AsUdPHr-qPKYxLqxL-6CBSnO438HKIv0m7kY

import  Config from 'ormconfig';

@Module({
  //imports: [ManageUserModule, ServerModule, ChannelModule, GroupchatModule, DirectmessageModule, TypeOrmModule.forRoot(Config), JwtAuthModule, AuthModule],
  imports: [ManageUserModule, ServerModule, ChannelModule, GroupchatModule, DirectmessageModule, TypeOrmModule.forRoot(Config), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
