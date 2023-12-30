import { Test, TestingModule } from '@nestjs/testing';
import { GroupchatService } from './groupchat.service';

describe('GroupchatService', () => {
  let service: GroupchatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupchatService],
    }).compile();

    service = module.get<GroupchatService>(GroupchatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
