import { AxiosResponse } from 'axios';
import {
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios/dist';
import axios from 'axios';
import { DailyMotionRequestDto } from './dto/daily-request.dto';
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
import { DM_API, DM_CHANNEL_OWNER } from 'src/config/config';
import { LoginRequestDto } from './dto/login-request.dto';
import * as bcrypt from 'bcrypt';
import { ErrorMessageCode } from 'src/constants';
@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly userService: UserService, // private readonly uploadService: UploadService,
  ) {}
  async getAccessDM(auth: DailyMotionRequestDto) {
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

  async login(request: LoginRequestDto): Promise<any> {
    const user = await this.userService.findByEmail(request.username);
    if (!user) {
      throw new UnauthorizedException(ErrorMessageCode.LOGIN_FAIL);
    }
    const compareResult = await bcrypt.compare(request.password, user.password);
    if (!compareResult) {
      throw new UnauthorizedException(ErrorMessageCode.LOGIN_FAIL);
    }

    return user;
  }
}
