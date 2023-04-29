import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create(data: CreateUserDTO) {
    return this.prisma.user.create({ data });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getOne(id: number) {
    return this.prisma.user.findUnique({ where: { id } });
  }
}