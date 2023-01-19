import { PAGE_SIZE } from './config/config';
import { AxiosResponse } from 'axios';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios/dist';
import { LoginRequestDto } from './modules/auth/dto/login-request.dto';
import axios from 'axios';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}
