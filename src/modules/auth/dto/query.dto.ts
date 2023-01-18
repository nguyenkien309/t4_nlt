import { IsOptional } from 'class-validator';

export class PaginationQueryDto {
  @IsOptional()
  response_type?: any;

  @IsOptional()
  client_id?: any;

  @IsOptional()
  redirect_uri?: any;
}
