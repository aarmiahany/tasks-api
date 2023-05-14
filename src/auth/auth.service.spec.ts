import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { UnauthorizedException } from '@nestjs/common';

describe('AuthService', () => {
  let service: AuthService;
  const FAKE_TOKEN = 'FAKE_TOKEN';
  
  const mockJwtImpl = {
    'signAsync': jest.fn().mockImplementation((payload) => {
       return FAKE_TOKEN;
    })
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService, UsersService, {
        provide: JwtService,
        useValue: mockJwtImpl
      }]
    })
    .compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should register user token', async () => {
    const payload = { 'username': 'user1', 'password': 'pass1'};
    expect(await service.signIn(payload.username, payload.password)).toEqual({
      'access_token': FAKE_TOKEN
    });
  });

  it('should reponse with UnauthorizedException', async () => {
    const payload = { 'username': 'unknown', 'password': 'pass1'};
    try {
      expect(await service.signIn(payload.username, payload.password));
    } catch (E) {
      expect(E).toBeInstanceOf(UnauthorizedException);
    }
  });
  
});
