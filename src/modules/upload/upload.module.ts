import { HttpModule } from '@nestjs/axios';
import { forwardRef, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerService } from 'src/logger/custom.logger';
import { UploadVideoEntity } from './entities/upload-video.entity';
import { UploadController } from './upload.controller';
import { UploadRepository } from './upload.repository';
import { UploadService } from './upload.service';

@Module({
  imports: [TypeOrmModule.forFeature([UploadVideoEntity]), HttpModule],
  controllers: [UploadController],
  providers: [UploadService, UploadRepository, ConfigService, LoggerService],
  exports: [UploadService],
})
export class UploadModule {}
