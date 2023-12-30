import { Module } from '@nestjs/common';
import { DirectMessage } from './entities/directmessage.entity'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectmessageService } from './directmessage.service';
import { DirectmessageController } from './directmessage.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DirectMessage])],
  controllers: [DirectmessageController],
  providers: [DirectmessageService],
})
export class DirectmessageModule {}
