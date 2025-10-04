import { Test, TestingModule } from '@nestjs/testing';
import { ProfileUserService } from './profile.service';

describe('UserService', () => {
  let service: ProfileUserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileUserService],
    }).compile();

    service = module.get<ProfileUserService>(ProfileUserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
