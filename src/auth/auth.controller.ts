import {
    Body,
    Controller,
    HttpCode,
    HttpStatus,
    Post,
  } from '@nestjs/common';
  import { AuthService } from './auth.service';
  
  // auth module to login user and send create jwt token
  @Controller('auth')
  export class AuthController {
    constructor(private authService: AuthService) {}
  
    @HttpCode(HttpStatus.OK)
    @Post('login')
    signIn(@Body() signInDto: Record<string, any>) {
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

}