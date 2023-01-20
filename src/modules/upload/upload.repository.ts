import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepository } from 'src/base/base.repository';
import { UploadVideoEntity } from './entities/upload-video.entity';

@Injectable()
export class UploadRepository extends BaseRepository<UploadVideoEntity> {
  constructor(
    @InjectRepository(UploadVideoEntity)
    private repository: Repository<UploadVideoEntity>,
  ) {
    super(repository);
  }
}
