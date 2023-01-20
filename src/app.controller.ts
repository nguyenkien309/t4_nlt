import { AppService } from './app.service';

import { Get, Post, Body, Controller, Query, Req, Res } from '@nestjs/common';
import { AxiosResponse } from 'axios';
import { Observable } from 'rxjs';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { DailyMotionRequestDto } from './modules/auth/dto/daily-request.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
