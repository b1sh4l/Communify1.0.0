import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Member } from "src/manage-user/entities/manage-user.entity";
import { ManageUserService } from './manage-user.service';
import { ManageUserController } from './manage-user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Member])],
  controllers: [ManageUserController],
  providers: [ManageUserService],
  exports: [ManageUserService],
})
export class ManageUserModule {}
