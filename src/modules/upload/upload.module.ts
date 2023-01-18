import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from '../auth/auth.module';
import { UploadController } from './upload.controller';

@Module({
  imports: [ConfigModule, HttpModule, AuthModule],
  controllers: [UploadController],
})
export class UploadModule {}
