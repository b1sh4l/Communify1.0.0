import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Member } from "src/manage-user/entities/manage-user.entity";
import { CreateManageUserDto } from './dto/create-manage-user.dto';
import { UpdateManageUserDto } from './dto/update-manage-user.dto';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class ManageUserService {

  constructor(@InjectRepository(Member) private readonly memberRepo: Repository<Member>) {}


  async create(createManageUserDto: CreateManageUserDto) {
    const user = await this.memberRepo.create(createManageUserDto);
        return await this.memberRepo.save(user);
  }

  async findAll() {
    return await this.memberRepo.find();
  }

  async findOne(id: number) {
    return await this.memberRepo.findOne({where: {id:id}});
  }
  

  async update(id: number, updateManageUserDto: UpdateManageUserDto) {
    const member = await this.memberRepo.findOne({where : {id}});
    Object.keys(updateManageUserDto).forEach(key => {
      if (updateManageUserDto[key] !== undefined) {
        member[key] = updateManageUserDto[key];
      }
    });

    await this.memberRepo.save(member);

    const updatedMember = await this.memberRepo.findOne({ where: { id } });

    return updatedMember;
  }

  async remove(id: number) {
    return await this.memberRepo.delete(id);
  }

  async editUsername(id: number, newUsername: string) {
    const user = await this.findOne(id);
    user.username = newUsername;
    return await this.memberRepo.save(user);
  }

  async removeProfilePicture(id: number) {
    const user = await this.findOne(id);
    user.profile_picture = null;
    return await this.memberRepo.save(user);
  }

  async assignRole(id: number, newRole: string) {
    const user = await this.memberRepo.findOne({ where: { id } });
    user.role = newRole;
    return await this.memberRepo.save(user);
  }


  // async assignRole(id: number, newRole: string) {
  //   const user = await this.memberRepo.findOne({ where: { id } });
  //   console.log('User found:', user);
  //   user.role = newRole;
  //   const updatedUser = await this.memberRepo.save(user);
  //   console.log('Updated user:', updatedUser);
  //   return updatedUser;
  // }

  
  async limitUserActions(id: number, restrictions: string[]) {
    const user = await this.findOne(id);
    
    return await this.memberRepo.save(user);
  }

  async banUser(id: number) {
    const user = await this.findOne(id);
    user.is_banned = true;
    return await this.memberRepo.save(user);
  }

  async getMemberByEmail(email: string): Promise<Member | undefined> {
    const member = await this.memberRepo.findOne({ where: { email } });

    if (!member) {
        console.log('Member not found for email:', email);
        throw new BadRequestException('Email not found');
    }

    return member;
}



}
