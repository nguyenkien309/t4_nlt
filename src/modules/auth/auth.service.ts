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
import { PublicVideoDto } from '../upload/dto/public-video.dto';
import { UserService } from '../user/user.service';
import { UserEntity } from '../user/entities/user.entity';
import { UploadService } from '../upload/upload.service';
import { UploadVideoEntity } from '../upload/entities/upload-video.entity';
import { PublicVideoEntity } from '../upload/entities/public-video.entity';
import { DM_API, DM_CHANNEL_OWNER } from 'src/config/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    private readonly uploadService: UploadService,
  ) {}
  async login(auth: LoginRequestDto) {
    const response = await this.httpService
      .post(`${DM_API}/oauth/token`, auth, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .toPromise();
    const user = new UserEntity(auth);
    user.id = response.data.uid;
    user.access_token = response.data.access_token;
    user.role = 'admin';
    await this.userService._store(user);
    return response.data;
  }

  async profile() {
    const response = await this.httpService.get(`${DM_API}/auth`).toPromise();
    return response.data;
  }

  async getUploadUrl() {
    const response = await this.httpService
      .get(`${DM_API}/file/upload`)
      .toPromise();
    return response.data.upload_url;
  }

  async uploadFile(file: Express.Multer.File) {
    const url = await this.getUploadUrl();
    const auth = await this.profile();
    const formData = new FormData();
    // const fileExtension = file.originalname.split('.').pop();
    // const fileName = uuid.v4() + '.' + fileExtension;
    await formData.append('file', file.buffer, { filename: file.originalname });

    const response = await this.httpService
      .post(url, formData, {
        data: formData,
        headers: {
          'Content-Length': formData.getLengthSync(),
        },
      })
      .toPromise();
    const uploadVideo = new UploadVideoEntity(response.data);
    uploadVideo.id = auth.id;
    await this.uploadService._store(uploadVideo);
    return response.data;
  }

  async publicVideo(publicVideoDto: PublicVideoDto) {
    const auth = await this.profile();
    const response = await this.httpService
      .post(`${DM_API}/user/${DM_CHANNEL_OWNER}/videos`, publicVideoDto, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
    const exist = await this.uploadService._findById(publicVideoDto.url);
    if (exist) {
      const publicVideo = new UploadVideoEntity(response.data);
      publicVideo.owner = auth.id;
      await this.uploadService._store(publicVideo);
    }
    return response.data;
  }
}
