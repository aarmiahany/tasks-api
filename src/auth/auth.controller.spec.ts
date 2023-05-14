import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthController', () => {
  let controller: AuthController;
  const FAKE_TOKEN = 'FAKE_TOKEN';
  const mockAuthService = {
    signIn: jest.fn((username, password) => {
       if (username === 'user1' && password === 'pass1') {
         return {
          'access_token': FAKE_TOKEN
         };
       }
       throw new UnauthorizedException();
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService],
      controllers: [AuthController],
    })
    // override service
    .overrideProvider(AuthService)
    .useValue(mockAuthService)
    .compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should signIn user', async () => {
    const payload = {
      username: 'user1',
      password: 'pass1'
    };
    expect(await controller.signIn(payload)).toEqual({
      'access_token': FAKE_TOKEN
    });
  }); 

  it('should repond with UnauthorizedException', async () => {
    const payload = {
      username: 'unknown',
      password: 'pass1'
    };
    try {
      expect(await controller.signIn(payload));
    } catch (E) {
      expect(E).toBeInstanceOf(UnauthorizedException);
    }
  }); 

});
