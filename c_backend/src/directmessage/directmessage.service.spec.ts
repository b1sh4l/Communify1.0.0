import { Test, TestingModule } from '@nestjs/testing';
import { DirectmessageService } from './directmessage.service';

describe('DirectmessageService', () => {
  let service: DirectmessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DirectmessageService],
    }).compile();

    service = module.get<DirectmessageService>(DirectmessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
