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
  ) {
    super(repository, logger);
  }
}
