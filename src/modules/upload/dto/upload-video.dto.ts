import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadQueryDto {
  @ApiProperty()
  @IsOptional()
  upload_url: string;
}
