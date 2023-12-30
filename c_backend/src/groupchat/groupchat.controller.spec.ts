import { Test, TestingModule } from '@nestjs/testing';
import { GroupchatController } from './groupchat.controller';
import { GroupchatService } from './groupchat.service';

describe('GroupchatController', () => {
  let controller: GroupchatController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GroupchatController],
      providers: [GroupchatService],
    }).compile();

    controller = module.get<GroupchatController>(GroupchatController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
