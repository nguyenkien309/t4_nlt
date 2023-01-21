import {
  Injectable,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { InjectDataSource } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { EntityId } from 'typeorm/repository/EntityId';
import { UploadRepository } from './upload.repository';
import { LoggerService } from 'src/logger/custom.logger';
import { BaseService } from 'src/base/base.service';
import { UploadVideoEntity } from './entities/upload-video.entity';
import { HttpService } from '@nestjs/axios';
import { DM_API, DM_CHANNEL_OWNER } from 'src/config/config';
import { AuthService } from '../auth/auth.service';
import FormData = require('form-data');
import { PublicVideoDto } from './dto/public-video.dto';
@Injectable()
export class UploadService extends BaseService<
  UploadVideoEntity,
  UploadRepository
> {
  constructor(
    @InjectDataSource() private readonly dataSource: DataSource,
    repository: UploadRepository,
    logger: LoggerService,
    private readonly httpService: HttpService,
    private readonly authService: AuthService,
  ) {
    super(repository, logger);
  }

  async getUploadUrl() {
    const response = await this.httpService
      .get(`${DM_API}/file/upload`)
      .toPromise();
    return response.data.upload_url;
  }

  async uploadFile(file: Express.Multer.File) {
    const url = await this.getUploadUrl();
    const auth = await this.authService.profile();
    const formData = new FormData();
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
    await this.repository.save(uploadVideo);
    return response.data;
  }

  async publicVideo(publicVideoDto: PublicVideoDto) {
    const auth = await this.authService.profile();
    const response = await this.httpService
      .post(`${DM_API}/user/${DM_CHANNEL_OWNER}/videos`, publicVideoDto, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      })
      .toPromise();
    const exist = await this.repository.findOne({
      where: { url: publicVideoDto.url },
    });
    if (exist) {
      exist.title = publicVideoDto.title;
      exist.channel = publicVideoDto.channel;
      exist.is_created_for_kids = publicVideoDto.is_created_for_kids;
      exist.owner = auth.id;
      await this.repository.save(exist);
    }
    return exist;
  }
}
