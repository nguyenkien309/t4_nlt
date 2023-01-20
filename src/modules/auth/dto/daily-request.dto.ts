import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class DailyMotionRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  grant_type: string;

  @ApiProperty()
  @IsNotEmpty()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  scope: any;

  @ApiProperty()
  @IsNotEmpty()
  client_id: string;

  @ApiProperty()
  @IsNotEmpty()
  client_secret: string;

  @ApiProperty()
  @IsNotEmpty()
  redirect_uri: string;

  @ApiProperty()
  @IsNotEmpty()
  code: string;
}
