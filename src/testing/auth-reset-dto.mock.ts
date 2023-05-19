import { AuthResetDTO } from "../auth/dto/auth-reset.dto";
import { resetToken } from "./reset-token.mock";

export const authResetDTOMock: AuthResetDTO = {
  password: 'sd@2s5As',
  token: resetToken
}