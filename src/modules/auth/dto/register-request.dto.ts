import { ApiProperty } from '@nestjs/swagger';
import { UniqueEmailValidator } from 'src/validators/unique-email.validator';
import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  Length,
  Validate,
} from 'class-validator';
import { PasswordConfirmValidator } from 'src/validators/password-confirm.validator';

export class RegisterRequestDto {
  @ApiProperty({ example: 'email@gmail.com' })
  @IsNotEmpty({ message: 'email is not empty' })
  @IsEmail(undefined, { message: 'email invalid' })
  @Validate(UniqueEmailValidator, { message: 'email invalid' })
  username: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty({ message: 'password is not empty' })
  @Length(8, 24, { message: 'password invalid' })
  password: string;

  @ApiProperty({ example: 'password' })
  @IsNotEmpty({ message: 'password confirmation is not empty' })
  @Validate(PasswordConfirmValidator, ['password'], {
    message: 'password confirmation invalid',
  })
  passwordConfirmation: string;
}
