import { IsEmail, IsString, MinLength } from "class-validator";
import { CreateUserDTO } from "src/user/dto/create-user.dto";

export class AuthRegisterDTO extends CreateUserDTO { }