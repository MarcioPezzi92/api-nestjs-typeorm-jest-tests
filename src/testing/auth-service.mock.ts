import { AuthService } from "../auth/auth.service";
import { accessToken } from "./access-token.mock";
import { jwtPayloadMock } from "./jwt-payload.mock";

export const authServiceMock = {
  provide: AuthService,
  useValue: {
    createToken: jest.fn().mockReturnValue({accessToken}),
    checkToken: jest.fn().mockReturnValue(jwtPayloadMock),
    isValidToken: jest.fn().mockReturnValue(true),
    login: jest.fn().mockResolvedValue({accessToken}),
    forget: jest.fn().mockResolvedValue({success: true}),
    reset: jest.fn().mockResolvedValue({accessToken}),
    register: jest.fn().mockResolvedValue({accessToken}),
  }
}