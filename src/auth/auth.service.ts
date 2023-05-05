import { Injectable, NotFoundException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly prisma: PrismaService
  ) { }

  async createToken() {
    // return this.jwtService.sign();
  }

  async checkToken(token: string) {
    // return this.jwtService.verify(token);
  }

  async login(email: string, password: string) {
    const user = await this.prisma.user.findFirst({
      where: { email, password }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    return user;
  }

  async forget(email: string) {
    const user = await this.prisma.user.findFirst({
      where: { email }
    });

    if (!user) {
      throw new NotFoundException('Usuário não encontrado!');
    }

    //TO DO: Enviar o e-mail

    return true;
  }

  async reset(password: string, token: string) {

    //TO DO: Validar o token

    const id = 0;

    await this.prisma.user.update({
      where: { id },
      data: { password }
    })

    return true;
  }
}