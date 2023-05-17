import { Role } from "../enums/role.enum";
import { CreateUserDTO } from "../user/dto/create-user.dto";

export const createUserDTOMock: CreateUserDTO = {
  birthAt: '2000-01-02',
  email: 'joao@email.com',
  name: 'João Jorge',
  password: '@sd34Sg#',
  role: Role.User
} 