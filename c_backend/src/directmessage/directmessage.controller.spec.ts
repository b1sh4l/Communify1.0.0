import { Test, TestingModule } from '@nestjs/testing';
import { DirectmessageController } from './directmessage.controller';
import { DirectmessageService } from './directmessage.service';

describe('DirectmessageController', () => {
  let controller: DirectmessageController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DirectmessageController],
      providers: [DirectmessageService],
    }).compile();

    controller = module.get<DirectmessageController>(DirectmessageController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
