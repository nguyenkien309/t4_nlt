import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class LoginRequestDto {
  @ApiProperty()
  @IsNotEmpty()
  grant_type: any;

  @ApiProperty()
  @IsNotEmpty()
  username: any;

  @ApiProperty()
  @IsNotEmpty()
  password: any;

  @ApiProperty()
  @IsNotEmpty()
  scope: any;

  @ApiProperty()
  @IsNotEmpty()
  client_id: any;

  @ApiProperty()
  @IsNotEmpty()
  client_secret: any;

  @ApiProperty()
  @IsNotEmpty()
  redirect_uri: any;

  @ApiProperty()
  @IsNotEmpty()
  code: any;
}
