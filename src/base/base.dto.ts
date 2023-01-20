import { ApiProperty } from '@nestjs/swagger';

import { IsInt, IsOptional, Min, Max, IsString } from 'class-validator';
import { MessageCode } from 'src/constants';

export class BaseResponseDto<T> {
  message: string;
  body: T;

  constructor(body: T | null = null, message = MessageCode.SUCCESS) {
    this.message = message;
    if (body instanceof String) {
      this.body = { ...body };
    } else {
      this.body = body;
    }
  }
}

export class AuthUserDto {
  email: string;
  id: number;
  role?: string;
}
