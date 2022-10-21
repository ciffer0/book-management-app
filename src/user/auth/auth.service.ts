import { ConflictException, HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { SigninParams, SignupParams } from 'src/types/user/auth.type';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signup(data: SignupParams): Promise<{ token: string }> {
    const userExists = await this.prismaService.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (userExists) {
      throw new ConflictException();
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const newUser = await this.prismaService.users.create({
      data: {
        first_name: data.firstName,
        last_name: data.lastName,
        email: data.email,
        password: hashedPassword,
      },
    });

    return this.generateJWT(newUser.id, newUser.email);
  }

  async signin(data: SigninParams): Promise<{ token: string }> {
    const userExists = await this.prismaService.users.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!userExists) {
      throw new HttpException('Invalid credentials', 400);
    }

    const validPassword = await bcrypt.compare(
      data.password,
      userExists.password,
    );

    if (!validPassword) {
      throw new HttpException('Invalid credentials', 400);
    }

    return this.generateJWT(userExists.id, userExists.email);
  }

  private async generateJWT(
    id: number,
    email: string,
  ): Promise<{ token: string }> {
    const token = await jwt.sign({ id, email }, process.env.TOKEN_KEY, {
      expiresIn: 3600000,
    });
    return { token };
  }
}
