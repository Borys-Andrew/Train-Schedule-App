import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const isUser = await this.userRepo.findOne({
      where: {
        email: createUserDto.email,
      },
    });

    if (isUser) throw new BadRequestException('Email already exists');

    const { username, email, password } = createUserDto;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.userRepo.save({
      username,
      email,
      password: hashedPassword,
    });
    const payload = { email };
    const token = this.jwtService.sign(payload);

    return {
      message: `User with name:<${user.username}> created successfully`,
      token,
    };
  }

  async findOne(email: string) {
    const user = await this.userRepo.findOne({
      where: {
        email,
      },
      select: {
        id: true,
        username: true,
        email: true,
        password: true,
      },
    });

    if (!user) throw new NotFoundException('User not found');

    return user;
  }
}
