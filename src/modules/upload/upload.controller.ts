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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}
}
