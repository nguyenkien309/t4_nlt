import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class LoginRequestDto {
  @ApiProperty({ example: 'nvk309@gmail.com' })
  @IsNotEmpty()
  username: string;

  @ApiProperty({ example: '12345678' })
  @IsNotEmpty()
  password: string;
}
