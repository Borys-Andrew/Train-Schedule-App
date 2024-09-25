import { IsEmail, MinLength } from 'class-validator';

const PASSWORD_LENGTH = 4;

export class CreateUserDto {
  @MinLength(4)
  username: string;

  @IsEmail()
  email: string;

  @MinLength(PASSWORD_LENGTH, {
    message: `Password must be min: ${PASSWORD_LENGTH} symbols...`,
  })
  password: string;
}
