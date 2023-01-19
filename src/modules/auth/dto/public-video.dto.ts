import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';

export class PublicVideoDto {
  @ApiProperty()
  @IsNotEmpty()
  url: any;
}
