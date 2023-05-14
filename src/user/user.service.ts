import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateUserDTO } from "./dto/create-user.dto";
import { UpdatePutUserDTO } from "./dto/update-put-user.dto";
import { UpdatePatchUserDTO } from "./dto/update-patch-user.dto";
import * as bcrypt from "bcrypt";
import { Repository } from "typeorm";
import { UserEntity } from "./entity/user.entity";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>
  ) { }

  async create(data: CreateUserDTO) {

    if(await this.usersRepository.exist({where: {email: data.email}})) {
      throw new BadRequestException("Email already exists.");
    }

    const salt = await bcrypt.genSalt();

    data.password = await bcrypt.hash(data.password, salt);

    const user = this.usersRepository.create(data);

    return this.usersRepository.save([user]);  
  }

  async getAll() {

    return this.usersRepository.find();
  }

  async getOne(id: number) {

    await this.checkIfExists(id);

    return this.usersRepository.findOneBy({ id });
  }

  async update(id: number, { email, name, password, birthAt, role }: UpdatePutUserDTO) {

    await this.checkIfExists(id);

    const salt = await bcrypt.genSalt();

    password = await bcrypt.hash(password, salt);

    await this.usersRepository.update(id, { 
      email, 
      name, 
      password, 
      birthAt: birthAt ? new Date(birthAt) : null, 
      role 
    });

    return this.getOne(id);
  }

  async updatePartial(id: number, { email, name, password, birthAt, role }: UpdatePatchUserDTO) {

    await this.checkIfExists(id);

    const salt = await bcrypt.genSalt();
    password = await bcrypt.hash(password, salt);

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

    if (role) {
      data.role = role;
    }

    await this.usersRepository.update(id, data);

    return this.getOne(id);
  }

  async delete(id: number) {

    await this.checkIfExists(id);

    return this.usersRepository.delete(id);
  }

  async checkIfExists(id: number) {

    if (!(await this.usersRepository.exist({ where: { id } }))) {
      throw new NotFoundException(`User ID: ${id} does not exist!`);
    }
  }

}