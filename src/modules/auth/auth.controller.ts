import { HttpService } from '@nestjs/axios';
import { AuthService } from './auth.service';
import {
  Get,
  Post,
  Body,
  Controller,
  Query,
  Req,
  Res,
  HttpCode,
  UseInterceptors,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { DailyMotionRequestDto } from './dto/daily-request.dto';
import { UploadFileQueryDto } from '../upload/dto/upload-file.dto';
import { PublicVideoDto } from '../upload/dto/public-video.dto';
import { BaseResponseDto } from 'src/base/base.dto';
import { UserEntity } from '../user/entities/user.entity';
import { plainToInstance, plainToClass } from 'class-transformer';
import { HttpServiceInterceptor } from '../http-module/http-module.service';
import { LoginRequestDto } from './dto/login-request.dto';
import { RegisterRequestDto } from './dto/register-request.dto';
import { UserService } from '../user/user.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Get('/oauth/token')
  async getAccessDM(
    @Body() auth: DailyMotionRequestDto,
  ): Promise<BaseResponseDto<any>> {
    const data = await this.authService.getAccessDM(auth);
    return new BaseResponseDto<any>(plainToInstance(UserEntity, data));
  }

  @HttpCode(HttpStatus.OK)
  @Post('/login')
  async login(@Body() request: LoginRequestDto): Promise<BaseResponseDto<any>> {
    const data = await this.authService.login(request);
    return new BaseResponseDto<any>(plainToInstance(UserEntity, data));
  }

  @HttpCode(HttpStatus.OK)
  @Post('/register')
  async register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<BaseResponseDto<UserEntity>> {
    const user = await this.userService._store(registerRequestDto);
    return new BaseResponseDto<UserEntity>(plainToClass(UserEntity, user));
  }

  @Get('/oauth/profile')
  async profile() {
    const data = await this.authService.profile();
    return new BaseResponseDto<any>(plainToInstance(UserEntity, data));
  }

  @Get('/callback')
  async callBack(@Req() req) {
    return req.query;
  }
}
