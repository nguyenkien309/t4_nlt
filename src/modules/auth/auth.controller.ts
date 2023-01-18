import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
import { Get, Post, Body, Controller, Query, Req, Res } from '@nestjs/common';
import { PaginationQueryDto } from './dto/query.dto';
import { LoginRequestDto } from './dto/login-request.dto';
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Get('/oauth/token')
  async login(@Body() auth: LoginRequestDto) {
    return await this.authService.login(auth);
  }

  @Get('/oauth/profile')
  async profile() {
    return await this.authService.profile();
  }

  @Get('/callback')
  async callBack(@Req() req) {
    return req.query;
  }
}
