import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DirectMessage } from './entities/directmessage.entity';
import { CreateDirectmessageDto } from './dto/create-directmessage.dto';
import { UpdateDirectmessageDto } from './dto/update-directmessage.dto';

@Injectable()
export class DirectmessageService {

  constructor(
    @InjectRepository(DirectMessage)
    private readonly directmessageRepository: Repository<DirectMessage>,
  ) {}

  async create(createDirectmessageDto: CreateDirectmessageDto) {
    const { senderId, receiverId, messageContent } = createDirectmessageDto;
    const directmessage = this.directmessageRepository.create({
    sender: { id: senderId },
    receiver: { id: receiverId },
    messageContent,
  });
    //const createdDirectmessage = await this.directmessageRepository.save(createDirectmessageDto);
    const createdDirectmessage = await this.directmessageRepository.save(directmessage);
    return createdDirectmessage;
  }

  // async create(createDirectmessageDto: CreateDirectmessageDto) {
  //   const { senderId, receiverId, messageContent } = createDirectmessageDto;

  //   // Retrieve sender and receiver entities from the database
  //   const sender = await this.directmessageRepository.findOne({ where: { id: senderId } });
  //   const receiver = await this.directmessageRepository.findOne({ where: { id: receiverId } });


  //   // if (!sender || !receiver) {
  //   //   throw new NotFoundException('Sender or receiver not found');
  //   // }

  //   // Create a new direct message
  //   const directmessage = this.directmessageRepository.create({
  //     sender,
  //     receiver,
  //     messageContent,
  //   });

  //   // Save the direct message to the database
  //   const createdDirectmessage = await this.directmessageRepository.save(directmessage);
  //   return createdDirectmessage;
  // }


  async findAll() {
    const allDirectmessages = await this.directmessageRepository.find();
    return allDirectmessages;
  }

  async findOne(id: number) {
    const directmessage = await this.directmessageRepository.findOne({ where: { id } });
    if (!directmessage) {
      throw new NotFoundException(`Direct message with ID ${id} not found`);
    }
    return directmessage;
  }

  async getMessagesBySenderId(senderId: number): Promise<DirectMessage[]> {
    const messages = await this.directmessageRepository.find({
      where: { sender: { id: senderId } },
      relations: ['sender', 'receiver'],
    });
  
    if (!messages || messages.length === 0) {
      throw new NotFoundException(`No messages found for sender with ID ${senderId}`);
    }
  
    return messages;
  }
  
  async getMessagesByReceiverId(receiverId: number): Promise<DirectMessage[]> {
    const messages = await this.directmessageRepository.find({
      where: { receiver: { id: receiverId } },
      relations: ['sender', 'receiver'],
    });
  
    if (!messages || messages.length === 0) {
      throw new NotFoundException(`No messages found for sender with ID ${receiverId}`);
    }
  
    return messages;
  }
  


  async remove(id: number) {
    const directMessage = await this.directmessageRepository.findOne({where:{id}});
    if (!directMessage) {
      throw new NotFoundException(`Direct message with ID ${id} not found`);
    }

    await this.directmessageRepository.remove(directMessage);
  
    return `Direct message with ID ${id} deleted successfully`;
  }
}
