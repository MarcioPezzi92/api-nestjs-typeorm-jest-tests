import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) { }

  async create({ email, name, password, birthAt }: CreateUserDTO) {
    return this.prisma.user.create({ data: { email, name, password, birthAt: birthAt ? new Date(birthAt) : null } });
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getOne(id: number) {

    await this.checkIfExists(id);

    return this.prisma.user.findUnique({ where: { id } });
  }

  async update(id: number, { email, name, password, birthAt }: UpdatePutUserDTO) {
    await this.checkIfExists(id);

    return this.prisma.user.update({
      data: { email, name, password, birthAt: birthAt ? new Date(birthAt) : null },
      where: { id }
    });
  }

  async updatePartial(id: number, { email, name, password, birthAt }: UpdatePatchUserDTO) {
    await this.checkIfExists(id);

    const data: any = {};

    if (birthAt) {
      data.birthAt = new Date(birthAt);
    }

    if (email) {
      data.email = email;
    }

    if (name) {
      data.name = name;
    }

    if (password) {
      data.password = password;
    }

    return this.prisma.user.update({ data, where: { id } })
  }

  async delete(id: number) {

    await this.checkIfExists(id);

    return this.prisma.user.delete({ where: { id: id } });
  }

  async checkIfExists(id: number) {
    if (!(await this.prisma.user.count({ where: { id } }))) {
      throw new NotFoundException(`User ID: ${id} does not exist!`);
    }
  }
}