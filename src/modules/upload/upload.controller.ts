import { UploadService } from './upload.service';
import { Get, Post, Body, Controller, Query, Req, Res } from '@nestjs/common';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
  @Get()
  async GetUrlUpload() {
    return await this.uploadService.getUrl();
  }
  @Post()
  async uploadFile() {
    return await this.uploadService.uploadFile();
  }
  @Post()
  async publicVideo() {
    return await this.uploadService.uploadFile();
  }
}
