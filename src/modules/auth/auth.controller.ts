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
import { LoginRequestDto } from './dto/login-request.dto';
import { UploadFileQueryDto } from '../upload/dto/upload-file.dto';
import { PublicVideoDto } from '../upload/dto/public-video.dto';
import { BaseResponseDto } from 'src/base/base.dto';
import { UserEntity } from '../user/entities/user.entity';
import { plainToInstance, plainToClass } from 'class-transformer';
import { HttpServiceInterceptor } from '../http-module/http-module.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('/oauth/token')
  async login(@Body() auth: LoginRequestDto): Promise<BaseResponseDto<any>> {
    const data = await this.authService.login(auth);
    return new BaseResponseDto<any>(plainToInstance(UserEntity, data));
  }

  @Get('/oauth/profile')
  async profile() {
    return await this.authService.profile();
  }

  @Get('/callback')
  async callBack(@Req() req) {
    return req.query;
  }

  @Get('/get-upload-url')
  async getUploadUrl() {
    return this.authService.getUploadUrl();
  }

  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  @Post('/upload')
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    return await this.authService.uploadFile(file);
  }

  @HttpCode(HttpStatus.OK)
  @Post('/public-video')
  async publicVideo(@Body() publicVideoDto: PublicVideoDto) {
    return await this.authService.publicVideo(publicVideoDto);
  }
}
