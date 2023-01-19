import { AxiosResponse } from 'axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios/dist';
import axios from 'axios';
import { LoginRequestDto } from './dto/login-request.dto';
import { ConfigService } from '@nestjs/config';
import { RedisService } from '../redis/redis.service';
import { UploadFileQueryDto } from '../upload/dto/upload-file.dto';
import * as path from 'path';
import * as fs from 'fs';
import * as uuid from 'uuid';
import FormData = require('form-data');
import { PublicVideoDto } from './dto/public-video.dto';
@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly redisService: RedisService,
  ) {}
  async login(auth: LoginRequestDto) {
    const response = await this.httpService
      .post('https://api.dailymotion.com/oauth/token', auth, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .toPromise();
    await this.redisService.set('userToken', response.data.access_token, 36000);

    return response.data;
  }

  async profile() {
    const response = await this.httpService
      .get(`https://api.dailymotion.com/auth`)
      .toPromise();
    return response.data;
  }

  async getRedisLoginToken() {
    return await this.redisService.get('userToken');
  }

  async getRedisUrlUpload() {
    return await this.redisService.get('uploadUrl');
  }

  async getUploadedFile() {
    return await this.redisService.get('uploadedFile');
  }

  async getUploadUrl() {
    const token = await this.getRedisLoginToken();
    const response = await this.httpService
      .get('https://api.dailymotion.com/file/upload', {
        headers: { Authorization: `Bearer ${token}` },
      })
      .toPromise();
    await this.redisService.set('uploadUrl', response.data.upload_url, 36000);
    return response.data.upload_url;
  }

  async uploadFile(file: Express.Multer.File) {
    const url = await this.getUploadUrl();
    const formData = new FormData();
    const fileExtension = file.originalname.split('.').pop();
    const fileName = uuid.v4() + '.' + fileExtension;
    await formData.append('file', file.buffer, { filename: fileName });

    const response = await this.httpService
      .post(url, formData, {
        data: formData,
        headers: {
          'Content-Length': formData.getLengthSync(),
        },
      })
      .toPromise();
    await this.redisService.set('uploadedFile', response.data.url, 36000);
    return response.data;
  }

  async publicVideo(publicVideoDto: PublicVideoDto) {
    // const uploadedFile = await this.getUploadedFile();
    const token = await this.getRedisLoginToken();
    console.log('UP', publicVideoDto);

    const channel = this.configService.get('DM_CHANNEL_OWNER');
    const response = await this.httpService
      .post(
        `https://api.dailymotion.com/user/${channel}/videos`,
        publicVideoDto,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
      .toPromise();
    return response.data;
  }
}
