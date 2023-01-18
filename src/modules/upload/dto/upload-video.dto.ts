import { IsOptional } from 'class-validator';

export class UploadQueryDto {
  @IsOptional()
  upload_url?: any;
}
