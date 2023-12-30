import { Test, TestingModule } from '@nestjs/testing';
import { ManageUserService } from './manage-user.service';

describe('ManageUserService', () => {
  let service: ManageUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageUserService],
    }).compile();

    service = module.get<ManageUserService>(ManageUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
