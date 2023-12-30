import { Test, TestingModule } from '@nestjs/testing';
import { ManageUserController } from './manage-user.controller';
import { ManageUserService } from './manage-user.service';

describe('ManageUserController', () => {
  let controller: ManageUserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManageUserController],
      providers: [ManageUserService],
    }).compile();

    controller = module.get<ManageUserController>(ManageUserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
