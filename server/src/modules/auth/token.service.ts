import jwt from 'jsonwebtoken';
import { ENV } from '../../config/env.config';
import type { AuthTokens, JwtPayload, Role } from '@divine/types';

export class TokenService {
  static generateTokens(userId: string, email: string, role: Role): AuthTokens {
    const payload: JwtPayload = { sub: userId, email, role };

    const accessToken = jwt.sign(payload, ENV.JWT_SECRET, {
      expiresIn: ENV.JWT_EXPIRES_IN as any,
    });

    const refreshToken = jwt.sign(payload, ENV.JWT_REFRESH_SECRET, {
      expiresIn: ENV.JWT_REFRESH_EXPIRES_IN as any,
    });

    return { accessToken, refreshToken };
  }

  static verifyRefreshToken(token: string): JwtPayload {
    return jwt.verify(token, ENV.JWT_REFRESH_SECRET) as JwtPayload;
  }
}
