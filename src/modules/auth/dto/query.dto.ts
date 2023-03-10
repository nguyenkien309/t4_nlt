import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class QueryDto {
  @ApiProperty()
  @IsOptional()
  response_type?: any;

  @ApiProperty()
  @IsOptional()
  client_id?: any;

  @ApiProperty()
  @IsOptional()
  redirect_uri?: any;
}
