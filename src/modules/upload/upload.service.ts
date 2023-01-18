import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common/decorators/core/injectable.decorator';
import { Body } from '@nestjs/common/decorators/http/route-params.decorator';

@Injectable()
export class UploadService {
  constructor(private readonly httpService: HttpService) {}
  async getUrl() {
    const response = await this.httpService
      .get('https://api.dailymotion.com/file/upload')
      .toPromise();

    return response.data;
  }
  async uploadFile() {
    return;
  }
  async publicVideo() {
    return;
  }
}
