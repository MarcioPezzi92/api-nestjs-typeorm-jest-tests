import { Role } from "../enums/role.enum";
import { UpdatePutUserDTO } from "../user/dto/update-put-user.dto";

export const updatePutUserDTOMock: UpdatePutUserDTO = {
  birthAt: '2000-01-02',
  email: 'joao@email.com',
  name: 'João Jorge',
  password: '@sd34Sg#',
  role: Role.User
} 