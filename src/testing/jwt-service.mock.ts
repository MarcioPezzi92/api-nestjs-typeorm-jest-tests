import { JwtService } from '@nestjs/jwt';
import { accessToken } from './access-token.mock';
import { jwtPayloadMock } from './jwt-payload.mock';

export const jwtServiceMock = {
  provide: JwtService,
  useValue: {
    sign: jest.fn().mockReturnValue(accessToken),
    verify: jest.fn().mockReturnValue(jwtPayloadMock),
  },
};
