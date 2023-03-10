import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/user/models/user.model';
import { LoginDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  async login(loginDto: LoginDto) {
    const user = await this.validateUser(loginDto);
    if (!user) {
      throw new HttpException('Foydalanuvchi topilmadi', HttpStatus.NOT_FOUND);
    }

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const condidate = await this.userService.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException('Bunday foydalanuvchi mavjud', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(userDto.password, 7);
    const user = await this.userService.create({
      ...userDto,
      password: hashedPassword
    })

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id };
    return { token: this.jwtService.sign(payload) };
  }

  private async validateUser(loginDto: LoginDto) {
    const user = await this.userService.getUserByEmail(loginDto.email);
    if (!user) {
      throw new UnauthorizedException("Emal yoki Parol noto'g'ri");
    }

    const validPassword = await bcrypt.compare(
      loginDto.password,
      user.password
    );
    if (validPassword) {
      return user;
    }

    throw new UnauthorizedException("Emal yoki Parol noto'g'ri");
  }
}
