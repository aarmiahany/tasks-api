import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';

describe('UsersService', () => {

  let service: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersService]
    })
    .compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return user by username', async () => {
      const username = 'user1';
      const result = {
        userId: 1,
        username: 'user1',
        password: 'pass1',
      };
      expect(await service.findOne(username)).toEqual(result);
  });

  it('should return undefined', async () => {
    const username = 'unknown';
    expect(await service.findOne(username)).toBeUndefined();
  });

});
