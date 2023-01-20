import { UploadService } from './upload.service';
import {
  Get,
  Post,
  Body,
  Controller,
  Query,
  Req,
  Res,
  UploadedFiles,
  HttpCode,
  UseInterceptors,
  HttpStatus,
  UploadedFile,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { PublicVideoDto } from './dto/public-video.dto';
import { UploadVideoEntity } from './entities/upload-video.entity';
import { BaseResponseDto } from 'src/base/base.dto';
import { plainToInstance, plainToClass } from 'class-transformer';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Get('/get-upload-url')
  async getUploadUrl() {
    const url = await this.uploadService.getUploadUrl();
    return new BaseResponseDto<UploadVideoEntity>(
      plainToClass(UploadVideoEntity, url),
    );
  }

  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(HttpStatus.OK)
  @Post('/upload')
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
  ): Promise<BaseResponseDto<UploadVideoEntity>> {
    const data = await this.uploadService.uploadFile(file);
    return new BaseResponseDto<any>(plainToInstance(UploadVideoEntity, data));
  }

  @HttpCode(HttpStatus.OK)
  @Post('/public-video')
  async publicVideo(
    @Body() publicVideoDto: PublicVideoDto,
  ): Promise<BaseResponseDto<UploadVideoEntity>> {
    const data = await this.uploadService.publicVideo(publicVideoDto);
    return new BaseResponseDto<any>(plainToInstance(UploadVideoEntity, data));
  }
}
