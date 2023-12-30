import { Injectable , NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateChannelDto } from './dto/create-channel.dto';
import { UpdateChannelDto } from './dto/update-channel.dto';
import { Channel } from "src/channel/entities/channel.entity";

@Injectable()
export class ChannelService {

  constructor(
    @InjectRepository(Channel)
    private readonly channelRepository: Repository<Channel>,
  ) {}

  async create(createChannelDto: CreateChannelDto){
    const channel = this.channelRepository.create(createChannelDto);
    return await this.channelRepository.save(channel);
  }

  async findAll(): Promise<Channel[]> {
    return this.channelRepository.find();
  }

  async findOne(id: number): Promise<Channel> {
    const channel = await this.channelRepository.findOne({where:{id}});
    if (!channel) {
      throw new NotFoundException(`Channel with ID ${id} not found`);
    }
    return channel;
  }

  async update(id: number, updateChannelDto: UpdateChannelDto): Promise<Channel> {
    await this.findOne(id); 
    await this.channelRepository.update(id, updateChannelDto);
    return await this.findOne(id);
  }

  async remove(id: number): Promise<void> {
    const channel = await this.findOne(id); // Ensure the channel exists
    await this.channelRepository.remove(channel);
  }

  // async sendMessage(id: number, message: string): Promise<Channel> {
  //   const channel = await this.findOne(id); // Ensure the channel exists
  //   channel.messages.push(message);
  //   return await this.channelRepository.save(channel);
  // }

  // async limitUsers(id: number, maxUsers: number): Promise<Channel> {
  //   const channel = await this.findOne(id); // Ensure the channel exists
  //   channel.maxUsers = maxUsers;
  //   return await this.channelRepository.save(channel);
  // }
}
