import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret || 'fallbackSecret',
    });
  }

  async validate(payload: any) {
    return { 
      userId: payload.userId,
      username: payload.username,
      firstName: payload.firstName,
      lastName: payload.lastName
    };
  }
}
