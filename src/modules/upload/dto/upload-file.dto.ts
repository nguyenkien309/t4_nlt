import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class UploadFileQueryDto {
  @ApiProperty()
  @IsOptional()
  uuid: string;

  @ApiProperty()
  @IsOptional()
  seal: string;

  @ApiProperty()
  @IsOptional()
  extra: string;
}
