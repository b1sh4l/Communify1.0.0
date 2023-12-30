import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GroupChat } from './entities/groupchat.entity';
import { CreateGroupchatDto } from './dto/create-groupchat.dto';
import { UpdateGroupchatDto } from './dto/update-groupchat.dto';
import { GroupMembers } from './entities/groupmembers.entity';
import { CreateGroupMembersDto } from './dto/create-groupmembers.dto'; 
import { FindOptionsWhere, DeepPartial  } from 'typeorm';



@Injectable()
export class GroupchatService {

  constructor(
    @InjectRepository(GroupChat)
    private readonly groupchatRepository: Repository<GroupChat>,
    @InjectRepository(GroupMembers)
    private readonly groupMembersRepository: Repository<GroupMembers>,
  ) {}


   async create(createGroupchatDto: CreateGroupchatDto) {
    const groupChat = await this.groupchatRepository.create(createGroupchatDto);
    return await this.groupchatRepository.save(groupChat);
  }

  async invite(groupId: number, createGroupMembersDto: CreateGroupMembersDto) {
    const { groupId: newGroupId, memberId } = createGroupMembersDto;

   
    if (groupId !== newGroupId) {
      throw new BadRequestException('Group ID in the URL does not match the one in the request body');
    }

    const group = await this.groupchatRepository.findOne({ where: { id: groupId }}  );

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

   
    const maxAllowedMembers = 5; // Adjust 

    const currentMembersCount = await this.groupMembersRepository.count({
      where: { id : groupId },
    });

    if (currentMembersCount >= maxAllowedMembers) {
      throw new BadRequestException(`Group is already full. Maximum allowed members: ${maxAllowedMembers}`);
    }

 
    const existingMember = await this.groupMembersRepository.findOne({
      where: { groupChat: { id: groupId }, member: { id: memberId } } as FindOptionsWhere<GroupMembers>,
    });
    
    

    if (existingMember) {
      throw new BadRequestException(`User with ID ${memberId} is already a member of the group`);
    }

    const groupMembers = this.groupMembersRepository.create({
      groupChat: { id: groupId }, 
      member: { id: memberId },  
    } as DeepPartial<GroupMembers>);
    
    await this.groupMembersRepository.save(groupMembers);
    
    //console.log('End of invite method');
    
  }

  async findAll() {
    return await this.groupchatRepository.find();
  }

  async findOne(id: number) {
    const group = await this.groupchatRepository.findOne({ where: { id } });


    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
    return group;
  }

  async update(id: number, updateGroupchatDto: UpdateGroupchatDto) {
    await this.findOne(id);
    const groupChat = await this.groupchatRepository.findOne({ where: { id } });
    groupChat.groupName = updateGroupchatDto.groupName;
    groupChat.groupType = updateGroupchatDto.groupType;
    return await this.groupchatRepository.save(groupChat);
  }

  async remove(id: number) {
    const group = await this.groupchatRepository.findOne({ where: { id }, relations: ['groupMembers'] });
  
    if (!group) {
      throw new NotFoundException(`Group with ID ${id} not found`);
    }
  
    if (group.groupMembers) {
      await this.groupMembersRepository.remove(group.groupMembers);
    }
  
    await this.groupchatRepository.delete(id);
  
    return `Group with ID ${id} deleted successfully`;
  }

  async getGroupMembers(groupId: number): Promise<number[]> {
    const group = await this.groupchatRepository.findOne({ where: { id: groupId }, relations: ['groupMembers'] });

    if (!group) {
      throw new NotFoundException(`Group with ID ${groupId} not found`);
    }

    return group.groupMembers.map((groupMember) => groupMember.member[0]);
  }
  
  
}