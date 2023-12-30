import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Server } from './entities/server.entity';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { Member } from 'src/manage-user/entities/manage-user.entity';
import { ServerMembers } from './entities/servermembers.entity';


@Injectable()
export class ServerService {

  constructor(
    @InjectRepository(Server)
    private readonly serverRepo: Repository<Server>,
    @InjectRepository(Member)
    private readonly memberRepository: Repository<Member>,
    @InjectRepository(ServerMembers)
    private readonly serverMemberRepository: Repository<ServerMembers>,
  ) {}

  async create(createServerDto: CreateServerDto) {
    const { serverName, serverType } = createServerDto;
  
    // Ensure serverType is present before creating the entity
    if (!serverType) {
      throw new Error("Server type is required.");
    }
  
    // Creating a new instance of the Server entity and mapping properties
    const server = this.serverRepo.create({
      serverName,
      serverType,
    });
  
    try {
      // Persisting the entity to the database
      return await this.serverRepo.save(server);
    } catch (error) {
      console.error("Error saving server to the database:", error);
      throw new Error("Internal Server Error");
    }
  }

  async findAll() {
    return await this.serverRepo.find();
  }

  async findOne(id: number) {
    const server = await this.serverRepo.findOne({where : {id}});
    if (!server) {
      throw new NotFoundException(`Server with ID ${id} not found`);
    }
    return server;
  }


  async update(id: number, updateServerDto: UpdateServerDto) {
    const server = await this.serverRepo.findOne({where : {id}});
    Object.keys(updateServerDto).forEach(key => {
      if (updateServerDto[key] !== undefined) {
        server[key] = updateServerDto[key];
      }
    });
  }

  async updateServerName(id: number, newServerName: string) {
    await this.findOne(id); 
    const server = await this.serverRepo.findOne({ where: { id } });
    server.serverName = newServerName;
    return await this.serverRepo.save(server);
  }

  async remove(id: number) {
    await this.findOne(id); 
    return await this.serverRepo.delete(id);
  }

  async inviteMember(serverId: number, memberId: number, role: string) {
    const server = await this.findOne(serverId);
  
    if (!server) {
      throw new NotFoundException(`Server with ID ${serverId} not found`);
    }
  
    const members = await this.memberRepository.findByIds([memberId]);
    const member = members[0];
  
    if (!member) {
      throw new NotFoundException(`Member with ID ${memberId} not found`);
    }
  
    server.serverMembers = server.serverMembers || [];

    const existingMemberInServer = server.serverMembers.find(sm => sm.member.id === memberId);
    if (existingMemberInServer) {
      throw new NotFoundException(`Member with ID ${memberId} is already part of the server`);
    }
  
    const serverMember = new ServerMembers();
    serverMember.server = server;
    serverMember.member = member;
    serverMember.memberRole = role;
  
    return await this.serverMemberRepository.save(serverMember);
  }

  async getMembers(serverId: number) {
    const server = await this.serverRepo.findOne({
      where: { id: serverId },
      relations: ['serverMembers', 'serverMembers.member'],
    });

    if (!server) {
      throw new NotFoundException(`Server with ID ${serverId} not found`);
    }

    return server.serverMembers.map(sm => ({
      memberId: sm.member.id,
      memberName: sm.member.username, 
      memberRole: sm.memberRole,
    }));
  }
  
}
