import { AxiosResponse } from 'axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios/dist';
import axios from 'axios';
import { LoginRequestDto } from './dto/login-request.dto';
import { ConfigService } from '@nestjs/config';
@Injectable()
export class AuthService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}
  async login(auth: LoginRequestDto) {
    const response = await this.httpService
      .post('https://api.dailymotion.com/oauth/token', auth, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      })
      .toPromise();

    return response.data;
  }

  async profile() {
    const response = await this.httpService
      .get(`https://api.dailymotion.com/auth`)
      .toPromise();
    return response.data;
  }
}
