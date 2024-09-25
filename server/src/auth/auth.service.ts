import * as argon2 from 'argon2';
import { UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { IUser } from 'src/types';
import { CreateUserDto } from 'src/user/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findOne(email);
    const isPasswordMatch = await argon2.verify(user.password, password);

    if (user && isPasswordMatch) {
      return user;
    }

    throw new UnauthorizedException('User or password are incorrect!');
  }

  async register(createUserDto: CreateUserDto) {
    const hashedPassword = await argon2.hash(createUserDto.password);
    const user = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return user;
  }

  async login(user: IUser) {
    const { id, email } = user;
    const payload = {
      id,
      email,
    };
    const token = await this.jwtService.sign(payload);

    return {
      id,
      email,
      token,
    };
  }
}
